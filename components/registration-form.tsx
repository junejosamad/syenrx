"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface EventSchedule {
  id: number
  activity_title: string
  activity_description?: string
  start_time: string
  end_time?: string
  location?: string
}

interface StepField {
  id: number
  field_name: string
  field_type: string
  is_required: boolean
  options?: string
}

interface ModuleStep {
  id: number
  title: string
  description?: string
  fields: StepField[]
}

interface EventModule {
  id: number
  title: string
  description?: string
  steps: ModuleStep[]
}

interface EventDetail {
  id: number
  title: string
  description: string
  is_team_event: boolean
  team_size?: number
  has_entry_fee: boolean
  entry_fee?: number
  payment_details?: string
  event_date: string
  registration_deadline: string
  modules: EventModule[]
  schedules: EventSchedule[]
}

interface RegistrationFormProps {
  eventId: string
  event: EventDetail
  onClose: () => void
}

export function RegistrationForm({ eventId, event, onClose }: RegistrationFormProps) {
  // We flatten the modules and steps into a simple array of wizard pages
  // Page 0: Basic Info (Name, Email, Team details if applicable)
  // Page 1...N: Dynamic Module Steps

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [draftId, setDraftId] = useState<number | null>(null)

  // Fetch Draft on Mount
  useEffect(() => {
    const fetchDraft = async () => {
      const token = localStorage.getItem("token")
      if (!token) return

      try {
        const response = await fetch(`http://localhost:8000/api/registrations/draft/${eventId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        if (response.ok) {
          const draft = await response.json()
          setDraftId(draft.id)
          setCurrentStepIndex(draft.current_step_index || 0)

          if (draft.registration_type) setRegistrationType(draft.registration_type as "individual" | "team")
          if (draft.user?.username) setUserName(draft.user.username)
          if (draft.user?.email) setUserEmail(draft.user.email)

          if (draft.team) {
            setTeamName(draft.team.team_name)
            if (draft.team.members) {
              setTeamMembers(draft.team.members.map((m: any) => ({ name: m.member_name, email: m.member_email })))
            }
          }

          // Populate step field values
          if (draft.step_responses && draft.step_responses.length > 0) {
            const values: Record<string, any> = {}
            draft.step_responses.forEach((resp: any) => {
              values[resp.field_id.toString()] = resp.response_value
            })
            setStepFieldValues(values)
          }
        }
      } catch (err) {
        console.error("Error fetching draft:", err)
      }
    }

    fetchDraft()
  }, [eventId])

  // Basic Info state
  const [registrationType, setRegistrationType] = useState<"individual" | "team">(
    event.is_team_event ? "team" : "individual",
  )
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [teamName, setTeamName] = useState("")
  const [teamMembers, setTeamMembers] = useState<Array<{ name: string; email: string }>>([])

  // Dynamic Fields state: { field_id: value }
  const [stepFieldValues, setStepFieldValues] = useState<Record<string, any>>({})

  // Form handling state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Pre-calculate flattened steps to track total number of pages
  // Array of { module: EventModule, step: ModuleStep, title: string }
  const dynamicWizardPages = (event.modules || []).flatMap((mod) =>
    (mod.steps || []).map((step) => ({
      moduleTitle: mod.title,
      moduleDescription: mod.description,
      stepTitle: step.title,
      stepDescription: step.description,
      fields: step.fields,
    }))
  )

  const totalSteps = 1 + dynamicWizardPages.length

  const handleNext = async () => {
    // Validate current step before proceeding
    if (currentStepIndex === 0) {
      if (!userName || !userEmail) {
        setError("Please provide your name and email to proceed.")
        return
      }
      if (event.is_team_event && registrationType === "team") {
        if (!teamName) {
          setError("Please provide a team name.")
          return
        }
        if (teamMembers.length < (event.team_size || 0)) {
          setError(`Please add at least ${event.team_size} team members.`)
          return
        }
        for (const member of teamMembers) {
          if (!member.name || !member.email) {
            setError("Please fill all team member names and emails.")
            return
          }
        }
      }
    } else {
      // Dynamic Step Validation
      const currentWizardPage = dynamicWizardPages[currentStepIndex - 1]
      for (const field of currentWizardPage.fields) {
        if (field.is_required && !stepFieldValues[field.id]) {
          setError(`Please fill the required field: ${field.field_name}`)
          return
        }
      }
    }

    // Save draft
    await saveProgress({ is_complete: false, target_step_index: currentStepIndex + 1 })
  }

  const handlePrevious = () => {
    setError("")
    setCurrentStepIndex((prev) => prev - 1)
  }

  const saveProgress = async ({ is_complete = false, target_step_index = currentStepIndex }: { is_complete?: boolean, target_step_index?: number } = {}) => {
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Not authenticated")

      const response = await fetch("http://localhost:8000/api/registrations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          event_id: Number.parseInt(eventId),
          user_name: userName || undefined,
          user_email: userEmail || undefined,
          registration_type: registrationType,
          team_name: registrationType === "team" ? teamName : undefined,
          team_members: registrationType === "team" ? teamMembers : undefined,
          step_field_values: Object.keys(stepFieldValues).length > 0 ? stepFieldValues : undefined,
          form_field_values: {},
          is_complete: is_complete,
          current_step_index: target_step_index,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setDraftId(data.id)

        if (is_complete) {
          setSuccess(true)
          setTimeout(() => {
            onClose()
          }, 2500)
        } else {
          setCurrentStepIndex(target_step_index)
        }
      } else {
        const errorData = await response.json()
        setError(errorData.detail || "Registration failed")
      }
    } catch (err) {
      setError("Error saving progress")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    // Final Validation on last step before submit
    if (currentStepIndex > 0) {
      const currentWizardPage = dynamicWizardPages[currentStepIndex - 1]
      for (const field of currentWizardPage.fields) {
        if (field.is_required && !stepFieldValues[field.id]) {
          setError(`Please fill the required field: ${field.field_name}`)
          return
        }
      }
    }

    await saveProgress({ is_complete: true })
  }

  const addTeamMember = () => setTeamMembers([...teamMembers, { name: "", email: "" }])
  const updateTeamMember = (index: number, field: string, value: string) => {
    const updated = [...teamMembers]
    updated[index] = { ...updated[index], [field]: value }
    setTeamMembers(updated)
  }
  const removeTeamMember = (index: number) => setTeamMembers(teamMembers.filter((_, i) => i !== index))

  const renderDynamicField = (field: StepField) => {
    const value = stepFieldValues[field.id] || ""

    switch (field.field_type) {
      case "text":
      case "email":
      case "phone":
      case "number":
        return (
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              {field.field_name} {field.is_required && <span className="text-pink-600">*</span>}
            </label>
            <input
              type={field.field_type === "phone" ? "tel" : field.field_type}
              value={value}
              onChange={(e) => setStepFieldValues({ ...stepFieldValues, [field.id]: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 shadow-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              placeholder={`Enter ${field.field_name.toLowerCase()}`}
            />
          </div>
        )
      case "textarea":
        return (
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              {field.field_name} {field.is_required && <span className="text-pink-600">*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => setStepFieldValues({ ...stepFieldValues, [field.id]: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 shadow-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              placeholder={`Enter ${field.field_name.toLowerCase()}`}
            />
          </div>
        )
      case "select":
        const options = field.options ? field.options.split(",").map(o => o.trim()) : []
        return (
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              {field.field_name} {field.is_required && <span className="text-pink-600">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => setStepFieldValues({ ...stepFieldValues, [field.id]: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 shadow-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            >
              <option value="">Select an option</option>
              {options.map((opt: string, idx: number) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )
      case "checkbox":
        return (
          <div key={field.id} className="mb-4 flex items-center gap-3">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => setStepFieldValues({ ...stepFieldValues, [field.id]: e.target.checked })}
              className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
            />
            <label className="text-sm font-semibold text-gray-800">
              {field.field_name} {field.is_required && <span className="text-pink-600">*</span>}
            </label>
          </div>
        )
      case "date":
        return (
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              {field.field_name} {field.is_required && <span className="text-pink-600">*</span>}
            </label>
            <input
              type="date"
              value={value}
              onChange={(e) => setStepFieldValues({ ...stepFieldValues, [field.id]: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 shadow-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            />
          </div>
        )
      default:
        return null
    }
  }

  if (success) {
    return (
      <div className="text-center py-16 px-6 bg-white rounded-2xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
        <p className="text-gray-600 text-lg">Thank you for registering. We look forward to seeing you at {event.title}.</p>
      </div>
    )
  }

  // Progress Percentage
  const progressPercent = ((currentStepIndex) / totalSteps) * 100

  return (
    <div className="bg-white p-8 md:p-12">
      {/* Step Wizard Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">
          <span>Step {currentStepIndex + 1} of {totalSteps}</span>
          <span>{Math.round(progressPercent)}% Completed</span>
        </div>
        <div className="w-full bg-pink-100 rounded-full h-3 max-w-full">
          <div
            className="bg-pink-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-medium rounded">
          {error}
        </div>
      )}

      {/* STEP 1: Basic Info */}
      {currentStepIndex === 0 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Basic Information</h2>
            <p className="text-gray-600 mt-2">Let's start with your contact details.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">Full Name <span className="text-pink-600">*</span></label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 shadow-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">Email Address <span className="text-pink-600">*</span></label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 shadow-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              placeholder="your@email.com"
            />
          </div>

          {event.is_team_event && (
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Team Details</h3>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-800">Team Name <span className="text-pink-600">*</span></label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 shadow-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                  placeholder="Enter team name"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-semibold text-gray-800">Team Members</label>
                  <span className="bg-pink-100 text-pink-800 text-xs font-bold px-2 py-1 rounded">Required: {event.team_size}</span>
                </div>

                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900"
                          placeholder="Member Name"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => updateTeamMember(index, "email", e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900"
                          placeholder="Member Email"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 font-bold text-sm rounded transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {teamMembers.length < (event.team_size || 0) && (
                    <button
                      type="button"
                      onClick={addTeamMember}
                      className="w-full py-4 border-2 border-dashed border-pink-300 text-pink-600 hover:bg-pink-50 font-bold rounded-lg transition-colors"
                    >
                      + Add Team Member
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2...N: Dynamic Module Steps */}
      {currentStepIndex > 0 && currentStepIndex <= dynamicWizardPages.length && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="mb-8">
            <span className="text-pink-600 font-bold uppercase tracking-wider text-sm mb-1 block">
              {dynamicWizardPages[currentStepIndex - 1].moduleTitle}
            </span>
            <h2 className="text-3xl font-bold text-gray-900">
              {dynamicWizardPages[currentStepIndex - 1].stepTitle}
            </h2>
            {dynamicWizardPages[currentStepIndex - 1].stepDescription && (
              <p className="text-gray-600 mt-2">{dynamicWizardPages[currentStepIndex - 1].stepDescription}</p>
            )}
          </div>

          <div className="space-y-6 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
            {dynamicWizardPages[currentStepIndex - 1].fields.map((field) => renderDynamicField(field))}
          </div>
        </div>
      )}

      {/* Wizard Navigation */}
      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
        <Button
          type="button"
          onClick={handlePrevious}
          disabled={currentStepIndex === 0 || loading}
          variant="outline"
          className={`px-8 py-4 font-bold text-lg rounded-xl transition-all ${currentStepIndex === 0 ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
        >
          ← Back
        </Button>

        {currentStepIndex < totalSteps - 1 ? (
          <Button
            type="button"
            onClick={handleNext}
            className="px-8 py-4 bg-pink-600 text-white hover:bg-pink-700 font-bold text-lg rounded-xl shadow-md transition-transform hover:scale-105"
          >
            Continue →
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-4 bg-green-600 text-white hover:bg-green-700 font-bold text-lg rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            {loading ? "Submitting..." : "Submit Registration ✓"}
          </Button>
        )}
      </div>
    </div>
  )
}
