"use client"

import { ReactNode } from "react"

interface KineticGridProps {
    items: {
        value: string
        label: string
    }[]
    className?: string
}

export function KineticGrid({ items, className = "" }: KineticGridProps) {
    return (
        <div className={`bg-white rounded-sm border border-[#E5D9F2] ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-3">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className={`
              p-10 md:p-14 text-center
              transition-colors duration-0
              hover:bg-[#F5EFFF]
              cursor-default
              ${i < items.length - 1 ? "border-b md:border-b-0 md:border-r border-[#E5D9F2]" : ""}
            `}
                    >
                        <div
                            className="text-5xl md:text-6xl font-bold text-[#A294F9] mb-3"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {item.value}
                        </div>
                        <div
                            className="text-sm text-[#6B6680] font-medium"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
