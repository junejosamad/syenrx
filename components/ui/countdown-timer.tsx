"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
    targetDate: Date
}

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

function calculateTimeLeft(target: Date): TimeLeft {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    }
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate))

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate))
        }, 1000)

        return () => clearInterval(interval)
    }, [targetDate])

    const blocks = [
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Mins" },
        { value: timeLeft.seconds, label: "Secs" },
    ]

    return (
        <div className="flex items-center gap-3 sm:gap-5">
            {blocks.map((block, i) => (
                <div key={block.label} className="flex items-center gap-3 sm:gap-5">
                    <div className="flex flex-col items-center">
                        <div
                            className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 min-w-[72px] sm:min-w-[90px] text-center"
                        >
                            <span
                                className="font-mono text-3xl sm:text-5xl font-medium text-[#2D2B3A] tabular-nums"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                {String(block.value).padStart(2, "0")}
                            </span>
                        </div>
                        <span
                            className="mt-2 text-[10px] sm:text-xs font-medium uppercase tracking-[0.1em] text-[#6B6680]"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            {block.label}
                        </span>
                    </div>
                    {i < blocks.length - 1 && (
                        <span className="text-2xl sm:text-4xl font-light text-[#A294F9]/60 -mt-6">:</span>
                    )}
                </div>
            ))}
        </div>
    )
}
