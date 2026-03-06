"use client"

import { CountdownTimer } from "@/components/ui/countdown-timer"

// Event date: March 28, 2026
const EVENT_DATE = new Date("2026-03-28T09:00:00+05:00")

export function Countdown() {
    return (
        <section className="relative bg-[#F5EFFF] py-8 -mt-20 z-10">
            <div className="max-w-4xl mx-auto px-6 flex justify-center">
                <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-3xl px-8 py-8 sm:px-12 sm:py-10">
                    <p
                        className="text-center text-xs font-medium uppercase tracking-[0.1em] text-[#6B6680] mb-6"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Event begins in
                    </p>
                    <CountdownTimer targetDate={EVENT_DATE} />
                </div>
            </div>
        </section>
    )
}
