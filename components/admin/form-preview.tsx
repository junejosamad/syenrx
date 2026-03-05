"use client"

interface FormField {
  id?: number
  field_name: string
  field_type: string
  is_required: boolean
  field_order: number
  options?: string
}

interface FormPreviewProps {
  fields: FormField[]
}

export function FormPreview({ fields }: FormPreviewProps) {
  const renderField = (field: FormField) => {
    const label = (
      <label className="block text-sm font-semibold mb-2">
        {field.field_name} {field.is_required && <span className="text-red-500">*</span>}
      </label>
    )

    switch (field.field_type) {
      case "textarea":
        return (
          <div key={field.id} className="mb-4">
            {label}
            <textarea
              disabled
              rows={3}
              className="w-full px-3 py-2 bg-card border border-border text-foreground text-sm"
            />
          </div>
        )
      case "select":
        return (
          <div key={field.id} className="mb-4">
            {label}
            <select disabled className="w-full px-3 py-2 bg-card border border-border text-foreground text-sm">
              <option>Select an option</option>
              {field.options
                ?.split("\n")
                .filter((o) => o.trim())
                .map((option, idx) => (
                  <option key={idx}>{option.trim()}</option>
                ))}
            </select>
          </div>
        )
      case "file":
        return (
          <div key={field.id} className="mb-4">
            {label}
            <input
              disabled
              type="file"
              className="w-full px-3 py-2 bg-card border border-border text-foreground text-sm"
            />
          </div>
        )
      default:
        return (
          <div key={field.id} className="mb-4">
            {label}
            <input
              disabled
              type={field.field_type}
              className="w-full px-3 py-2 bg-card border border-border text-foreground text-sm"
            />
          </div>
        )
    }
  }

  return (
    <div>
      {fields.length === 0 ? (
        <p className="text-muted text-sm text-center py-4">No fields added yet</p>
      ) : (
        <div className="space-y-4">
          {fields.sort((a, b) => a.field_order - b.field_order).map((field) => renderField(field))}
          <button
            disabled
            className="w-full px-4 py-2 bg-card border border-border text-foreground text-sm cursor-not-allowed"
          >
            Submit Registration
          </button>
        </div>
      )}
    </div>
  )
}
