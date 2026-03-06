"use client"

import { useState, useEffect } from "react"
import { KineticGrid } from "@/components/ui/kinetic-grid"
import { fetchLandingStats } from "@/lib/api"

const defaultStats = [
    { value: "2000+", label: "Participants" },
    { value: "40+", label: "Competitions & Events" },
    { value: "$50k", label: "Total Prize Pool" },
]

export function Statistics() {
    const [stats, setStats] = useState(defaultStats)

    useEffect(() => {
        fetchLandingStats()
            .then((data) => {
                setStats([
                    {
                        value: data.total_registrations > 0 ? `${data.total_registrations}+` : "2000+",
                        label: "Registered Attendees",
                    },
                    {
                        value: `${data.total_events}+`,
                        label: "Competitions & Events",
                    },
                    {
                        value: data.total_prize_pool,
                        label: "Total Prize Pool",
                    },
                ])
            })
            .catch(() => {
                // Keep default stats on error
            })
    }, [])

    return (
        <section className="bg-[#F5EFFF] py-24 sm:py-32">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2B3A] mb-4"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                    >
                        By the Numbers
                    </h2>
                    <p
                        className="text-base text-[#6B6680] max-w-xl mx-auto"
                        style={{ fontFamily: "var(--font-body)", lineHeight: "1.6" }}
                    >
                        The scale of Pakistan&apos;s biggest tech convergence.
                    </p>
                </div>

                <KineticGrid items={stats} />
            </div>
        </section>
    )
}
