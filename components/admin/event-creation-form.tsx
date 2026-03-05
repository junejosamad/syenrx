"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import type React from "react"
import { ModuleStepBuilder } from "./module-step-builder"
import { ScheduleBuilder } from "./schedule-builder"
import type { EventModule } from "./module-step-builder"
import type { ScheduleItem } from "./schedule-builder"

interface EventCreationFormProps {
  onEventCreated: () => void
}

export function EventCreationForm({ onEventCreated }: EventCreationFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_team_event: false,
    team_size: 0,
    has_entry_fee: false,
    entry_fee: 0,
    payment_details: "",
    event_date: "",
    registration_deadline: "",
    max_registrations: 0,
  })

  const [modules, setModules] = useState<EventModule[]>([])
  const [schedules, setSchedules] = useState<ScheduleItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")

      // Transform modules for API
      const apiModules = modules.map((mod, modIdx) => ({
        title: mod.title,
        description: mod.description,
        module_order: modIdx,
        steps: mod.steps.map((step, stepIdx) => ({
          title: step.title,
          description: step.description,
          step_order: stepIdx,
          fields: step.fields.map((field, fieldIdx) => ({
            field_name: field.field_name,
            field_type: field.field_type,
            is_required: field.is_required,
            field_order: fieldIdx,
            options: field.options || null,
            placeholder: field.placeholder || null,
          })),
        })),
      }))

      // Transform schedules for API
      const apiSchedules = schedules
        .filter((s) => s.activity_title && s.start_time)
        .map((s) => ({
          activity_title: s.activity_title,
          activity_description: s.activity_description || null,
          start_time: new Date(s.start_time).toISOString(),
          end_time: s.end_time ? new Date(s.end_time).toISOString() : null,
          location: s.location || null,
        }))

      const response = await fetch("http://localhost:8000/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          event_date: new Date(formData.event_date).toISOString(),
          registration_deadline: new Date(formData.registration_deadline).toISOString(),
          modules: apiModules,
          schedules: apiSchedules,
        }),
      })

      if (response.ok) {
        setFormData({
          title: "",
          description: "",
          is_team_event: false,
          team_size: 0,
          has_entry_fee: false,
          entry_fee: 0,
          payment_details: "",
          event_date: "",
          registration_deadline: "",
          max_registrations: 0,
        })
        setModules([])
        setSchedules([])
        onEventCreated()
      } else {
        const errData = await response.json()
        setError(errData.detail || "Failed to create event")
      }
    } catch (err) {
      setError("Error creating event")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <div className="text-red-500 text-lg bg-red-50 p-4 rounded-lg border border-red-200">{error}</div>}

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Event Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border text-foreground rounded"
            placeholder="Enter event title"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Event Date</label>
          <input
            type="datetime-local"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border text-foreground rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 bg-background border border-border text-foreground rounded"
          placeholder="Enter event description"
        />
      </div>

      {/* Registration Settings */}
      <div className="border-t border-border pt-6">
        <h3 className="text-2xl font-bold mb-6">Registration Settings</h3>

        <div className="space-y-4 mb-6">
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="checkbox"
              name="is_team_event"
              checked={formData.is_team_event}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-lg">Team Event</span>
          </label>

          {formData.is_team_event && (
            <div className="ml-8">
              <label className="block text-lg font-semibold mb-2">Team Size (members per team)</label>
              <input
                type="number"
                name="team_size"
                value={formData.team_size}
                onChange={handleChange}
                min="2"
                className="w-full md:w-64 px-4 py-3 bg-background border border-border text-foreground rounded"
                placeholder="e.g., 4"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="checkbox"
              name="has_entry_fee"
              checked={formData.has_entry_fee}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-lg">Has Entry Fee</span>
          </label>

          {formData.has_entry_fee && (
            <div className="ml-8 space-y-4">
              <div>
                <label className="block text-lg font-semibold mb-2">Entry Fee Amount</label>
                <input
                  type="number"
                  name="entry_fee"
                  value={formData.entry_fee}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full md:w-64 px-4 py-3 bg-background border border-border text-foreground rounded"
                  placeholder="e.g., 100"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Payment Receiving Details</label>
                <textarea
                  name="payment_details"
                  value={formData.payment_details}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-border text-foreground rounded"
                  placeholder="Enter bank account, UPI, or other payment details"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Settings */}
      <div className="border-t border-border pt-6">
        <h3 className="text-2xl font-bold mb-6">Additional Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Registration Deadline</label>
            <input
              type="datetime-local"
              name="registration_deadline"
              value={formData.registration_deadline}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-border text-foreground rounded"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Max Registrations (optional)</label>
            <input
              type="number"
              name="max_registrations"
              value={formData.max_registrations}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 bg-background border border-border text-foreground rounded"
              placeholder="Leave empty for unlimited"
            />
          </div>
        </div>
      </div>

      {/* Module & Step Builder */}
      <ModuleStepBuilder modules={modules} onModulesChange={setModules} />

      {/* Schedule Builder */}
      <ScheduleBuilder schedules={schedules} onSchedulesChange={setSchedules} />

      {/* Submit */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="px-8 py-3 bg-green-600 text-white hover:bg-green-700 font-bold text-lg rounded-lg">
          {loading ? "Creating..." : "Create Event"}
        </Button>
      </div>
    </form>
  )
}
