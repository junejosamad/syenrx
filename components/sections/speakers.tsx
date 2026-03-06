"use client"

import { useState } from "react"
import { speakers } from "@/data/speakers"
import { SpeakerBioModal } from "@/components/modals/speaker-bio-modal"
import type { Speaker } from "@/types/event"

export function Speakers() {
    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null)

    return (
        <section id="speakers" className="bg-[#F5EFFF] py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2B3A] mb-4"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                    >
                        Meet the Speakers
                    </h2>
                    <p
                        className="text-base text-[#6B6680] max-w-xl mx-auto"
                        style={{ fontFamily: "var(--font-body)", lineHeight: "1.6" }}
                    >
                        Industry leaders and innovators sharing their vision for the future.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {speakers.map((speaker) => (
                        <div
                            key={speaker.id}
                            onClick={() => setSelectedSpeaker(speaker)}
                            className="group backdrop-blur-md bg-white/40 border border-white/50 rounded-3xl p-6
                transition-all duration-300 ease-out
                hover:-translate-y-1.5 hover:shadow-[0_0_30px_-5px_rgba(162,148,249,0.5)]
                cursor-pointer text-center"
                        >
                            {/* Avatar */}
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#A294F9] to-[#CDC1FF] flex items-center justify-center text-white text-2xl font-bold"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {speaker.name.split(" ").map(n => n[0]).join("")}
                            </div>

                            <h3
                                className="text-lg font-bold text-[#2D2B3A] mb-1"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {speaker.name}
                            </h3>
                            <p
                                className="text-sm text-[#A294F9] font-medium mb-3"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                {speaker.role} @ {speaker.company}
                            </p>
                            <span
                                className="inline-block text-xs px-3 py-1 rounded-full bg-[#E5D9F2]/60 text-[#6B6680] font-medium"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                {speaker.topic}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Speaker Bio Modal */}
            {selectedSpeaker && (
                <SpeakerBioModal
                    speaker={selectedSpeaker}
                    onClose={() => setSelectedSpeaker(null)}
                />
            )}
        </section>
    )
}
