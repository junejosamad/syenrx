"use client"

import { competitions } from "@/data/competitions"

export function Competitions() {
    return (
        <section id="competitions" className="bg-[#F5EFFF] py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2B3A] mb-4"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                    >
                        Compete &amp; Win
                    </h2>
                    <p
                        className="text-base text-[#6B6680] max-w-xl mx-auto"
                        style={{ fontFamily: "var(--font-body)", lineHeight: "1.6" }}
                    >
                        Six intense competitions with real prizes. Show your skills and take home the glory.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {competitions.map((comp) => (
                        <div
                            key={comp.id}
                            className="group backdrop-blur-md bg-white/40 border border-white/50 rounded-3xl p-6
                transition-all duration-300 ease-out
                hover:scale-[1.03] hover:border-[#A294F9]/60
                hover:shadow-[0_0_30px_-5px_rgba(162,148,249,0.5)]
                cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-3xl">{comp.icon}</span>
                                <span
                                    className="text-xs font-medium px-3 py-1 rounded-full bg-[#A294F9]/10 text-[#A294F9]"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    {comp.prizePool}
                                </span>
                            </div>
                            <h3
                                className="text-lg font-bold text-[#2D2B3A] mb-2"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {comp.title}
                            </h3>
                            <p
                                className="text-sm text-[#6B6680] leading-relaxed"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                {comp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
