"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface FormField {
  id: number
  field_name: string
  field_type: string
  is_required: boolean
  options?: string
}

interface CustomFormResponseProps {
  registrationId: number
  eventId: number
  formFields: FormField[]
}

export function CustomFormResponse({ registrationId, eventId, formFields }: CustomFormResponseProps) {
  const [responses, setResponses] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (fieldId: number, value: string) => {
    setResponses((prev) => ({ ...prev, [fieldId]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate required fields
    for (const field of formFields) {
      if (field.is_required && !responses[field.id]) {
        setError(`${field.field_name} is required`)
        setLoading(false)
        return
      }
    }

    try {
      const response = await fetch(`http://localhost:8000/api/registrations/${registrationId}/form-responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responses),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          window.location.href = "/events"
        }, 2000)
      } else {
        setError("Failed to submit form")
      }
    } catch (err) {
      setError("Error submitting form")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (formFields.length === 0) {
    return null
  }

  if (success) {
    return (
      <div className="border border-green-500 bg-green-500/10 p-6">
        <p className="text-green-500 font-semibold mb-2">Form Submitted Successfully</p>
        <p className="text-muted text-sm">Your registration is complete. Redirecting...</p>
      </div>
    )
  }

  const renderField = (field: FormField) => {
    const label = (
      <label className="block text-lg font-semibold mb-2">
        {field.field_name} {field.is_required && <span className="text-red-500">*</span>}
      </label>
    )

    switch (field.field_type) {
      case "textarea":
        return (
          <div key={field.id} className="mb-6">
            {label}
            <textarea
              value={responses[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.is_required}
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border text-foreground"
            />
          </div>
        )
      case "select":
        return (
          <div key={field.id} className="mb-6">
            {label}
            <select
              value={responses[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.is_required}
              className="w-full px-4 py-3 bg-background border border-border text-foreground"
            >
              <option value="">Select an option</option>
              {field.options
                ?.split("\n")
                .filter((o) => o.trim())
                .map((option, idx) => (
                  <option key={idx} value={option.trim()}>
                    {option.trim()}
                  </option>
                ))}
            </select>
          </div>
        )
      case "file":
        return (
          <div key={field.id} className="mb-6">
            {label}
            <input
              type="file"
              onChange={(e) => handleChange(field.id, e.target.files?.[0]?.name || "")}
              required={field.is_required}
              className="w-full px-4 py-3 bg-background border border-border text-foreground"
            />
          </div>
        )
      default:
        return (
          <div key={field.id} className="mb-6">
            {label}
            <input
              type={field.field_type}
              value={responses[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.is_required}
              className="w-full px-4 py-3 bg-background border border-border text-foreground"
            />
          </div>
        )
    }
  }

  return (
    <div className="border border-border p-8">
      <h2 className="text-2xl font-bold mb-8">Event Registration Form</h2>

      {error && <div className="text-red-500 text-lg mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        {formFields.sort((a, b) => a.id - b.id).map((field) => renderField(field))}

        <Button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-foreground text-background hover:bg-muted text-lg font-semibold"
        >
          {loading ? "Submitting..." : "Submit Registration"}
        </Button>
      </form>
    </div>
  )
}
