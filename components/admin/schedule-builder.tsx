"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ScheduleItem {
    id: string
    activity_title: string
    activity_description: string
    start_time: string
    end_time: string
    location: string
}

interface ScheduleBuilderProps {
    schedules: ScheduleItem[]
    onSchedulesChange: (schedules: ScheduleItem[]) => void
}

export function ScheduleBuilder({ schedules, onSchedulesChange }: ScheduleBuilderProps) {
    const addScheduleItem = () => {
        const newItem: ScheduleItem = {
            id: `sched_${Date.now()}`,
            activity_title: "",
            activity_description: "",
            start_time: "",
            end_time: "",
            location: "",
        }
        onSchedulesChange([...schedules, newItem])
    }

    const updateScheduleItem = (id: string, updates: Partial<ScheduleItem>) => {
        onSchedulesChange(schedules.map((s) => (s.id === id ? { ...s, ...updates } : s)))
    }

    const removeScheduleItem = (id: string) => {
        onSchedulesChange(schedules.filter((s) => s.id !== id))
    }

    return (
        <div className="space-y-6 border-t border-border pt-6">
            <div>
                <h3 className="text-2xl font-bold mb-2">Event Schedule & Activities</h3>
                <p className="text-muted mb-4">
                    Add the schedule/activities for your event so users can see what to expect.
                </p>
            </div>

            {schedules.map((item, idx) => (
                <div key={item.id} className="border border-amber-200 rounded-lg bg-amber-50/50 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-800 flex items-center gap-2">
                            <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                {idx + 1}
                            </span>
                            Activity {idx + 1}
                        </span>
                        <Button
                            type="button"
                            onClick={() => removeScheduleItem(item.id)}
                            className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 text-sm rounded"
                        >
                            Remove
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Activity Title *</label>
                            <input
                                type="text"
                                value={item.activity_title}
                                onChange={(e) => updateScheduleItem(item.id, { activity_title: e.target.value })}
                                placeholder="e.g., Opening Ceremony"
                                className="w-full px-3 py-2 bg-white border border-border rounded text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Location (optional)</label>
                            <input
                                type="text"
                                value={item.location}
                                onChange={(e) => updateScheduleItem(item.id, { location: e.target.value })}
                                placeholder="e.g., Main Hall"
                                className="w-full px-3 py-2 bg-white border border-border rounded text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Description (optional)</label>
                        <textarea
                            value={item.activity_description}
                            onChange={(e) => updateScheduleItem(item.id, { activity_description: e.target.value })}
                            placeholder="Brief description of this activity"
                            rows={2}
                            className="w-full px-3 py-2 bg-white border border-border rounded text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Start Time *</label>
                            <input
                                type="datetime-local"
                                value={item.start_time}
                                onChange={(e) => updateScheduleItem(item.id, { start_time: e.target.value })}
                                className="w-full px-3 py-2 bg-white border border-border rounded text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">End Time (optional)</label>
                            <input
                                type="datetime-local"
                                value={item.end_time}
                                onChange={(e) => updateScheduleItem(item.id, { end_time: e.target.value })}
                                className="w-full px-3 py-2 bg-white border border-border rounded text-sm"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <Button
                type="button"
                onClick={addScheduleItem}
                className="w-full px-6 py-3 border-2 border-dashed border-amber-400 text-amber-700 hover:bg-amber-100 bg-transparent rounded-lg font-semibold"
            >
                + Add Schedule Activity
            </Button>
        </div>
    )
}

export type { ScheduleItem }
