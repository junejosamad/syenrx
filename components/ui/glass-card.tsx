"use client"

import { ReactNode } from "react"

interface GlassCardProps {
    children: ReactNode
    className?: string
    hover?: boolean
    glow?: boolean
    onClick?: () => void
}

export function GlassCard({
    children,
    className = "",
    hover = true,
    glow = false,
    onClick,
}: GlassCardProps) {
    return (
        <div
            onClick={onClick}
            className={`
        backdrop-blur-md
        bg-white/40
        border border-white/50
        rounded-3xl
        p-6
        transition-all duration-300 ease-out
        ${hover ? "hover:-translate-y-1.5 hover:shadow-[0_0_30px_-5px_rgba(162,148,249,0.5)] cursor-pointer" : ""}
        ${glow ? "shadow-[0_0_20px_-5px_rgba(162,148,249,0.4)]" : "shadow-[0_4px_24px_-4px_rgba(162,148,249,0.15)]"}
        ${className}
      `}
        >
            {children}
        </div>
    )
}
