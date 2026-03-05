"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface FormField {
  id: string
  name: string
  type: "text" | "email" | "phone" | "number" | "textarea" | "select" | "checkbox" | "date"
  label: string
  required: boolean
  options?: string[] // For select fields
}

interface FormFieldsBuilderProps {
  fields: FormField[]
  onFieldsChange: (fields: FormField[]) => void
}

const PREDEFINED_FIELDS = [
  { id: "name", label: "Full Name", type: "text" as const, fieldType: "Name" },
  { id: "enrollment", label: "Enrollment Number", type: "text" as const, fieldType: "Enrollment" },
  { id: "cnic", label: "CNIC / ID Number", type: "text" as const, fieldType: "CNIC" },
  { id: "whatsapp", label: "WhatsApp Number", type: "phone" as const, fieldType: "WhatsApp" },
  { id: "email", label: "Email Address", type: "email" as const, fieldType: "Email" },
  { id: "department", label: "Department", type: "text" as const, fieldType: "Department" },
]

const FIELD_TYPES = [
  { value: "text", label: "Short Text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone Number" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Long Text" },
  { value: "select", label: "Dropdown" },
  { value: "checkbox", label: "Checkbox" },
  { value: "date", label: "Date" },
]

export function FormFieldsBuilder({ fields, onFieldsChange }: FormFieldsBuilderProps) {
  const [showAddField, setShowAddField] = useState(false)
  const [newField, setNewField] = useState<Partial<FormField>>({
    type: "text",
    required: false,
  })

  const addPredefinedField = (predefinedField: (typeof PREDEFINED_FIELDS)[0]) => {
    const field: FormField = {
      id: `field_${Date.now()}`,
      name: predefinedField.id,
      type: predefinedField.type,
      label: predefinedField.label,
      required: true,
    }
    onFieldsChange([...fields, field])
  }

  const addCustomField = () => {
    if (!newField.label || !newField.type) {
      alert("Please fill in all required fields")
      return
    }

    const field: FormField = {
      id: `field_${Date.now()}`,
      name: newField.label?.toLowerCase().replace(/\s+/g, "_"),
      type: newField.type as FormField["type"],
      label: newField.label,
      required: newField.required || false,
      options: newField.options,
    }

    onFieldsChange([...fields, field])
    setNewField({ type: "text", required: false })
    setShowAddField(false)
  }

  const removeField = (id: string) => {
    onFieldsChange(fields.filter((f) => f.id !== id))
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    onFieldsChange(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)))
  }

  return (
    <div className="space-y-8 border-t border-border pt-6">
      <div>
        <h3 className="text-2xl font-bold mb-6">Registration Form Fields</h3>
        <p className="text-muted mb-6">Add predefined or custom fields to your registration form</p>
      </div>

      {/* Current Fields */}
      {fields.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Added Fields ({fields.length})</h4>
          <div className="space-y-3">
            {fields.map((field) => (
              <div
                key={field.id}
                className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200"
              >
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{field.label}</p>
                  <p className="text-sm text-muted">
                    Type: {FIELD_TYPES.find((ft) => ft.value === field.type)?.label} {field.required && " • Required"}
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => removeField(field.id)}
                  className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Predefined Fields */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Quick Add - Predefined Fields</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PREDEFINED_FIELDS.map((predefinedField) => (
            <Button
              key={predefinedField.id}
              type="button"
              onClick={() => addPredefinedField(predefinedField)}
              disabled={fields.some((f) => f.name === predefinedField.id)}
              className="px-4 py-3 bg-purple-500 text-white hover:bg-purple-600 rounded disabled:opacity-50 disabled:cursor-not-allowed text-left"
            >
              + {predefinedField.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Add Custom Field */}
      <div>
        <Button
          type="button"
          onClick={() => setShowAddField(!showAddField)}
          className="px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded font-semibold"
        >
          {showAddField ? "Cancel" : "+ Add Custom Field"}
        </Button>

        {showAddField && (
          <div className="mt-6 space-y-4 bg-green-50 p-6 rounded-lg border-2 border-green-200">
            <div>
              <label className="block text-lg font-semibold mb-2">Field Label</label>
              <input
                type="text"
                value={newField.label || ""}
                onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                placeholder="e.g., Company Name"
                className="w-full px-4 py-3 bg-white border border-border rounded"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Field Type</label>
              <select
                value={newField.type || "text"}
                onChange={(e) =>
                  setNewField({
                    ...newField,
                    type: e.target.value as FormField["type"],
                    options: undefined,
                  })
                }
                className="w-full px-4 py-3 bg-white border border-border rounded"
              >
                {FIELD_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Options for Select Fields */}
            {newField.type === "select" && (
              <div>
                <label className="block text-lg font-semibold mb-2">Options (comma-separated)</label>
                <input
                  type="text"
                  defaultValue={newField.options?.join(", ") || ""}
                  onChange={(e) =>
                    setNewField({ ...newField, options: e.target.value.split(",").map((o) => o.trim()) })
                  }
                  placeholder="e.g., Option 1, Option 2, Option 3"
                  className="w-full px-4 py-3 bg-white border border-border rounded"
                />
              </div>
            )}

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={newField.required || false}
                onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                className="w-5 h-5"
              />
              <span className="text-lg font-semibold">Required Field</span>
            </label>

            <Button
              type="button"
              onClick={addCustomField}
              className="w-full px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded font-semibold"
            >
              Add Field
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
