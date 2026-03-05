"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface FormField {
  id?: number
  field_name: string
  field_type: string
  is_required: boolean
  field_order: number
  options?: string
}

interface FormBuilderProps {
  eventId: string
  fields: FormField[]
  onFieldsUpdated: () => void
}

const FIELD_TYPES = [
  { value: "text", label: "Short Text" },
  { value: "textarea", label: "Long Text" },
  { value: "email", label: "Email" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "select", label: "Dropdown" },
  { value: "file", label: "File Upload" },
]

export function FormBuilder({ eventId, fields, onFieldsUpdated }: FormBuilderProps) {
  const [fieldName, setFieldName] = useState("")
  const [fieldType, setFieldType] = useState("text")
  const [isRequired, setIsRequired] = useState(true)
  const [selectOptions, setSelectOptions] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAddField = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const newField: FormField = {
        field_name: fieldName,
        field_type: fieldType,
        is_required: isRequired,
        field_order: fields.length + 1,
        options: fieldType === "select" ? selectOptions : undefined,
      }

      const response = await fetch(`http://localhost:8000/api/events/${eventId}/form-fields`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newField, admin_id: 1 }),
      })

      if (response.ok) {
        setFieldName("")
        setFieldType("text")
        setIsRequired(true)
        setSelectOptions("")
        onFieldsUpdated()
      }
    } catch (error) {
      console.error("Error adding field:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteField = async (fieldId: number) => {
    if (!confirm("Are you sure you want to delete this field?")) return

    try {
      const response = await fetch(`http://localhost:8000/api/form-fields/${fieldId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_id: 1 }),
      })

      if (response.ok) {
        onFieldsUpdated()
      }
    } catch (error) {
      console.error("Error deleting field:", error)
    }
  }

  return (
    <div className="space-y-12">
      <div className="border border-border p-8">
        <h2 className="text-2xl font-bold mb-6">Add Form Field</h2>

        <form onSubmit={handleAddField} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Field Name</label>
            <input
              type="text"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-border text-foreground"
              placeholder="e.g., College Name, Phone Number"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold mb-2">Field Type</label>
              <select
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border text-foreground"
              >
                {FIELD_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRequired}
                  onChange={(e) => setIsRequired(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-lg">Required</span>
              </label>
            </div>
          </div>

          {fieldType === "select" && (
            <div>
              <label className="block text-lg font-semibold mb-2">Options (one per line)</label>
              <textarea
                value={selectOptions}
                onChange={(e) => setSelectOptions(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 bg-background border border-border text-foreground"
                placeholder="Option 1&#10;Option 2&#10;Option 3"
              />
            </div>
          )}

          <Button type="submit" disabled={loading} className="px-6 py-3 bg-foreground text-background hover:bg-muted">
            {loading ? "Adding..." : "Add Field"}
          </Button>
        </form>
      </div>

      {fields.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Form Fields</h2>
          <div className="space-y-4">
            {fields
              .sort((a, b) => a.field_order - b.field_order)
              .map((field) => (
                <div key={field.id} className="border border-border p-6 flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{field.field_name}</h3>
                    <div className="flex gap-4 text-sm text-muted">
                      <span>Type: {FIELD_TYPES.find((t) => t.value === field.field_type)?.label}</span>
                      {field.is_required && <span>Required</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => field.id && handleDeleteField(field.id)}
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
