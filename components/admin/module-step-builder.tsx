"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

// Types
interface StepField {
    id: string
    field_name: string
    field_type: "text" | "email" | "phone" | "number" | "textarea" | "select" | "checkbox" | "date"
    is_required: boolean
    field_order: number
    options?: string
    placeholder?: string
}

interface ModuleStep {
    id: string
    title: string
    description: string
    step_order: number
    fields: StepField[]
}

interface EventModule {
    id: string
    title: string
    description: string
    module_order: number
    steps: ModuleStep[]
}

interface ModuleStepBuilderProps {
    modules: EventModule[]
    onModulesChange: (modules: EventModule[]) => void
}

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

const PREDEFINED_FIELDS = [
    { label: "Full Name", field_type: "text" as const },
    { label: "Email Address", field_type: "email" as const },
    { label: "Phone / WhatsApp", field_type: "phone" as const },
    { label: "Enrollment Number", field_type: "text" as const },
    { label: "CNIC / ID Number", field_type: "text" as const },
    { label: "Department", field_type: "text" as const },
]

export function ModuleStepBuilder({ modules, onModulesChange }: ModuleStepBuilderProps) {
    const [expandedModule, setExpandedModule] = useState<string | null>(null)
    const [expandedStep, setExpandedStep] = useState<string | null>(null)

    // ── Module CRUD ─────────────────────────────────────
    const addModule = () => {
        const newModule: EventModule = {
            id: `mod_${Date.now()}`,
            title: "",
            description: "",
            module_order: modules.length,
            steps: [],
        }
        onModulesChange([...modules, newModule])
        setExpandedModule(newModule.id)
    }

    const updateModule = (moduleId: string, updates: Partial<EventModule>) => {
        onModulesChange(modules.map((m) => (m.id === moduleId ? { ...m, ...updates } : m)))
    }

    const removeModule = (moduleId: string) => {
        onModulesChange(modules.filter((m) => m.id !== moduleId))
    }

    // ── Step CRUD ───────────────────────────────────────
    const addStep = (moduleId: string) => {
        const mod = modules.find((m) => m.id === moduleId)
        if (!mod) return
        const newStep: ModuleStep = {
            id: `step_${Date.now()}`,
            title: "",
            description: "",
            step_order: mod.steps.length,
            fields: [],
        }
        updateModule(moduleId, { steps: [...mod.steps, newStep] })
        setExpandedStep(newStep.id)
    }

    const updateStep = (moduleId: string, stepId: string, updates: Partial<ModuleStep>) => {
        const mod = modules.find((m) => m.id === moduleId)
        if (!mod) return
        updateModule(moduleId, {
            steps: mod.steps.map((s) => (s.id === stepId ? { ...s, ...updates } : s)),
        })
    }

    const removeStep = (moduleId: string, stepId: string) => {
        const mod = modules.find((m) => m.id === moduleId)
        if (!mod) return
        updateModule(moduleId, { steps: mod.steps.filter((s) => s.id !== stepId) })
    }

    // ── Field CRUD ──────────────────────────────────────
    const addField = (moduleId: string, stepId: string, fieldData?: Partial<StepField>) => {
        const mod = modules.find((m) => m.id === moduleId)
        if (!mod) return
        const step = mod.steps.find((s) => s.id === stepId)
        if (!step) return

        const newField: StepField = {
            id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            field_name: fieldData?.field_name || "",
            field_type: (fieldData?.field_type as StepField["field_type"]) || "text",
            is_required: fieldData?.is_required ?? true,
            field_order: step.fields.length,
            options: fieldData?.options,
            placeholder: fieldData?.placeholder,
        }

        updateStep(moduleId, stepId, { fields: [...step.fields, newField] })
    }

    const updateField = (moduleId: string, stepId: string, fieldId: string, updates: Partial<StepField>) => {
        const mod = modules.find((m) => m.id === moduleId)
        if (!mod) return
        const step = mod.steps.find((s) => s.id === stepId)
        if (!step) return
        updateStep(moduleId, stepId, {
            fields: step.fields.map((f) => (f.id === fieldId ? { ...f, ...updates } : f)),
        })
    }

    const removeField = (moduleId: string, stepId: string, fieldId: string) => {
        const mod = modules.find((m) => m.id === moduleId)
        if (!mod) return
        const step = mod.steps.find((s) => s.id === stepId)
        if (!step) return
        updateStep(moduleId, stepId, {
            fields: step.fields.filter((f) => f.id !== fieldId),
        })
    }

    return (
        <div className="space-y-6 border-t border-border pt-6">
            <div>
                <h3 className="text-2xl font-bold mb-2">Registration Modules & Steps</h3>
                <p className="text-muted mb-4">
                    Build your registration form by creating modules. Each module can contain multiple steps,
                    and each step can have multiple input fields. Users will fill them out step-by-step.
                </p>
            </div>

            {/* Modules List */}
            {modules.map((mod, modIdx) => (
                <div key={mod.id} className="border-2 border-indigo-200 rounded-xl bg-indigo-50/50 overflow-hidden">
                    {/* Module Header */}
                    <div
                        className="flex items-center justify-between p-4 bg-indigo-100 cursor-pointer"
                        onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                    >
                        <div className="flex items-center gap-3">
                            <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                {modIdx + 1}
                            </span>
                            <div>
                                <h4 className="font-bold text-lg text-indigo-900">
                                    {mod.title || `Module ${modIdx + 1} (untitled)`}
                                </h4>
                                <p className="text-sm text-indigo-600">{mod.steps.length} step(s)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeModule(mod.id) }}
                                className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 text-sm rounded"
                            >
                                Remove
                            </Button>
                            <span className="text-indigo-400 text-xl">{expandedModule === mod.id ? "▲" : "▼"}</span>
                        </div>
                    </div>

                    {/* Module Body */}
                    {expandedModule === mod.id && (
                        <div className="p-5 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Module Title *</label>
                                    <input
                                        type="text"
                                        value={mod.title}
                                        onChange={(e) => updateModule(mod.id, { title: e.target.value })}
                                        placeholder="e.g., Personal Information"
                                        className="w-full px-3 py-2 bg-white border border-border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Description (optional)</label>
                                    <input
                                        type="text"
                                        value={mod.description}
                                        onChange={(e) => updateModule(mod.id, { description: e.target.value })}
                                        placeholder="Brief description of this module"
                                        className="w-full px-3 py-2 bg-white border border-border rounded"
                                    />
                                </div>
                            </div>

                            {/* Steps inside this Module */}
                            <div className="space-y-4">
                                <h5 className="font-bold text-base text-indigo-800">Steps in this Module:</h5>

                                {mod.steps.map((step, stepIdx) => (
                                    <div key={step.id} className="border border-green-200 rounded-lg bg-green-50/50 overflow-hidden">
                                        {/* Step Header */}
                                        <div
                                            className="flex items-center justify-between p-3 bg-green-100 cursor-pointer"
                                            onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                                    {stepIdx + 1}
                                                </span>
                                                <span className="font-semibold text-green-900">
                                                    {step.title || `Step ${stepIdx + 1} (untitled)`}
                                                </span>
                                                <span className="text-xs text-green-600">({step.fields.length} field(s))</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); removeStep(mod.id, step.id) }}
                                                    className="px-2 py-1 bg-red-500 text-white hover:bg-red-600 text-xs rounded"
                                                >
                                                    Remove
                                                </Button>
                                                <span className="text-green-400">{expandedStep === step.id ? "▲" : "▼"}</span>
                                            </div>
                                        </div>

                                        {/* Step Body */}
                                        {expandedStep === step.id && (
                                            <div className="p-4 space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-sm font-semibold mb-1">Step Title *</label>
                                                        <input
                                                            type="text"
                                                            value={step.title}
                                                            onChange={(e) => updateStep(mod.id, step.id, { title: e.target.value })}
                                                            placeholder="e.g., Basic Details"
                                                            className="w-full px-3 py-2 bg-white border border-border rounded text-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-semibold mb-1">Description (optional)</label>
                                                        <input
                                                            type="text"
                                                            value={step.description}
                                                            onChange={(e) => updateStep(mod.id, step.id, { description: e.target.value })}
                                                            placeholder="What should the user fill in this step?"
                                                            className="w-full px-3 py-2 bg-white border border-border rounded text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Fields in this Step */}
                                                {step.fields.length > 0 && (
                                                    <div className="space-y-2">
                                                        <h6 className="font-semibold text-sm text-green-800">Fields:</h6>
                                                        {step.fields.map((field) => (
                                                            <div
                                                                key={field.id}
                                                                className="flex items-center justify-between bg-white p-3 rounded border border-gray-200"
                                                            >
                                                                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                                                                    <input
                                                                        type="text"
                                                                        value={field.field_name}
                                                                        onChange={(e) =>
                                                                            updateField(mod.id, step.id, field.id, { field_name: e.target.value })
                                                                        }
                                                                        placeholder="Field label"
                                                                        className="px-2 py-1 border border-border rounded text-sm"
                                                                    />
                                                                    <select
                                                                        value={field.field_type}
                                                                        onChange={(e) =>
                                                                            updateField(mod.id, step.id, field.id, {
                                                                                field_type: e.target.value as StepField["field_type"],
                                                                            })
                                                                        }
                                                                        className="px-2 py-1 border border-border rounded text-sm"
                                                                    >
                                                                        {FIELD_TYPES.map((t) => (
                                                                            <option key={t.value} value={t.value}>
                                                                                {t.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    {field.field_type === "select" && (
                                                                        <input
                                                                            type="text"
                                                                            value={field.options || ""}
                                                                            onChange={(e) =>
                                                                                updateField(mod.id, step.id, field.id, { options: e.target.value })
                                                                            }
                                                                            placeholder="Options (comma-sep)"
                                                                            className="px-2 py-1 border border-border rounded text-sm"
                                                                        />
                                                                    )}
                                                                    <label className="flex items-center gap-1 text-sm">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={field.is_required}
                                                                            onChange={(e) =>
                                                                                updateField(mod.id, step.id, field.id, { is_required: e.target.checked })
                                                                            }
                                                                            className="w-4 h-4"
                                                                        />
                                                                        Required
                                                                    </label>
                                                                </div>
                                                                <Button
                                                                    type="button"
                                                                    onClick={() => removeField(mod.id, step.id, field.id)}
                                                                    className="ml-2 px-2 py-1 bg-red-500 text-white hover:bg-red-600 text-xs rounded"
                                                                >
                                                                    ✕
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Add Field Actions */}
                                                <div className="space-y-3">
                                                    <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Quick Add Field:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {PREDEFINED_FIELDS.map((pf) => (
                                                            <Button
                                                                key={pf.label}
                                                                type="button"
                                                                onClick={() =>
                                                                    addField(mod.id, step.id, {
                                                                        field_name: pf.label,
                                                                        field_type: pf.field_type,
                                                                        is_required: true,
                                                                    })
                                                                }
                                                                className="px-3 py-1 bg-purple-500 text-white hover:bg-purple-600 text-xs rounded"
                                                            >
                                                                + {pf.label}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        onClick={() => addField(mod.id, step.id)}
                                                        className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 text-sm rounded font-medium"
                                                    >
                                                        + Add Custom Field
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    onClick={() => addStep(mod.id)}
                                    className="w-full px-4 py-3 border-2 border-dashed border-green-400 text-green-700 hover:bg-green-100 bg-transparent rounded-lg font-semibold"
                                >
                                    + Add Step to "{mod.title || `Module ${modIdx + 1}`}"
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Add Module Button */}
            <Button
                type="button"
                onClick={addModule}
                className="w-full px-6 py-4 border-2 border-dashed border-indigo-400 text-indigo-700 hover:bg-indigo-100 bg-transparent rounded-xl font-bold text-lg"
            >
                + Add Registration Module
            </Button>
        </div>
    )
}

export type { EventModule, ModuleStep, StepField }
