"use client"

import { useState } from "react"
import { schedule } from "@/data/schedule"

type FilterCategory = "all" | "ai" | "web3" | "design" | "startup" | "general"

const filters: { label: string; value: FilterCategory }[] = [
    { label: "All", value: "all" },
    { label: "AI & Robotics", value: "ai" },
    { label: "Web3", value: "web3" },
    { label: "Design", value: "design" },
    { label: "Startup", value: "startup" },
    { label: "General", value: "general" },
]

export function Schedule() {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>("all")
    const [activeDay, setActiveDay] = useState<1 | 2>(1)

    const filteredSchedule = schedule.filter((item) => {
        const matchesDay = item.day === activeDay
        const matchesCategory = activeFilter === "all" || item.category === activeFilter
        return matchesDay && matchesCategory
    })

    return (
        <section id="schedule" className="bg-[#F5EFFF] py-24 sm:py-32">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2B3A] mb-4"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                    >
                        Event Schedule
                    </h2>
                    <p
                        className="text-base text-[#6B6680] max-w-xl mx-auto"
                        style={{ fontFamily: "var(--font-body)", lineHeight: "1.6" }}
                    >
                        Two packed days of talks, workshops, and competitions.
                    </p>
                </div>

                {/* Day Tabs */}
                <div className="flex justify-center gap-3 mb-8">
                    {([1, 2] as const).map((day) => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${activeDay === day
                                    ? "bg-[#2D2B3A] text-white shadow-lg"
                                    : "bg-white/40 backdrop-blur-sm text-[#2D2B3A] border border-white/50 hover:bg-white/60"
                                }`}
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Day {day}
                        </button>
                    ))}
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setActiveFilter(filter.value)}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${activeFilter === filter.value
                                    ? "bg-[#2D2B3A] text-white"
                                    : "bg-white/40 backdrop-blur-sm text-[#2D2B3A] border border-white/40 hover:bg-white/60"
                                }`}
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-[#E5D9F2]" />

                    <div className="space-y-6">
                        {filteredSchedule.map((item) => (
                            <div key={item.id} className="relative pl-14 sm:pl-16">
                                {/* Node */}
                                <div className="absolute left-2.5 sm:left-4.5 top-6 w-3 h-3 rounded-full bg-[#A294F9] border-2 border-white shadow-[0_0_8px_rgba(162,148,249,0.6)]" />

                                {/* Card */}
                                <div className="backdrop-blur-md bg-white/40 border border-white/50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_-5px_rgba(162,148,249,0.3)]">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                        <span
                                            className="text-sm font-medium text-[#A294F9]"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            {item.time}
                                        </span>
                                        <span
                                            className="text-[10px] uppercase tracking-[0.1em] text-[#6B6680] font-medium px-2 py-0.5 bg-[#E5D9F2]/40 rounded-full"
                                            style={{ fontFamily: "var(--font-body)" }}
                                        >
                                            {item.category}
                                        </span>
                                    </div>
                                    <h3
                                        className="text-base font-bold text-[#2D2B3A] mb-2"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A294F9] to-[#CDC1FF] flex items-center justify-center text-white text-[10px] font-bold"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            {item.speaker.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <span
                                            className="text-sm text-[#6B6680]"
                                            style={{ fontFamily: "var(--font-body)" }}
                                        >
                                            {item.speaker}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredSchedule.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-[#6B6680] text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                No events match this filter. Try a different category.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
