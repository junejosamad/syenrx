"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

interface SynerXHeaderProps {
    onRegisterClick: () => void
}

export function Header({ onRegisterClick }: SynerXHeaderProps) {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const sentinelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const heroEl = document.querySelector("#hero")
        if (!heroEl) return

        const observer = new IntersectionObserver(
            ([entry]) => setScrolled(!entry.isIntersecting),
            { threshold: 0 }
        )

        observer.observe(heroEl)
        return () => observer.disconnect()
    }, [])

    const navLinks = [
        { label: "Home", href: "#hero" },
        { label: "Competitions", href: "#competitions" },
        { label: "Schedule", href: "#schedule" },
        { label: "Speakers", href: "#speakers" },
        { label: "Sponsors", href: "#sponsors" },
    ]

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/60 backdrop-blur-xl border-b border-white/30 shadow-[0_2px_20px_-4px_rgba(162,148,249,0.1)]"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <a
                    href="#hero"
                    className="text-2xl font-bold tracking-tight text-[#2D2B3A] hover:opacity-80 transition"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    SynerX
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-[#6B6680] hover:text-[#2D2B3A] transition-colors"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Register CTA */}
                <div className="hidden md:block">
                    <button
                        onClick={onRegisterClick}
                        className="px-5 py-2.5 bg-[#A294F9] text-white text-sm font-semibold rounded-xl
              shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_8px_-2px_rgba(162,148,249,0.5)]
              hover:bg-[#8B7AE8] transition-all duration-200"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Register
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-[#2D2B3A] text-2xl"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white/80 backdrop-blur-xl border-t border-white/30">
                    <div className="px-6 py-4 flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm font-medium text-[#6B6680] hover:text-[#2D2B3A] py-2 transition-colors"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                setMobileOpen(false)
                                onRegisterClick()
                            }}
                            className="mt-2 w-full py-3 bg-[#A294F9] text-white text-sm font-semibold rounded-xl
                shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#8B7AE8] transition-all"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Register Now
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}
