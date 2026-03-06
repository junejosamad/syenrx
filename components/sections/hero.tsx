"use client"

import { BlobBackground } from "@/components/ui/blob-background"

interface HeroProps {
    onRegisterClick: () => void
}

export function Hero({ onRegisterClick }: HeroProps) {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F5EFFF]"
        >
            <BlobBackground />

            <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-32">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-sm border border-white/50 mb-8">
                    <span className="w-2 h-2 rounded-full bg-[#A294F9] animate-pulse" />
                    <span
                        className="text-xs font-medium uppercase tracking-[0.1em] text-[#6B6680]"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        March 2026 • Lahore, Pakistan
                    </span>
                </div>

                {/* Headline */}
                <h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-[72px] font-bold leading-[1.05] mb-6 text-[#2D2B3A]"
                    style={{
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.02em",
                    }}
                >
                    SynerX 2026:
                    <br />
                    <span className="bg-gradient-to-r from-[#A294F9] to-[#CDC1FF] bg-clip-text text-transparent">
                        Pakistan&apos;s Next Generation
                    </span>
                    <br />
                    Tech Convergence
                </h1>

                {/* Subhead */}
                <p
                    className="text-base sm:text-lg md:text-xl text-[#6B6680] mb-10 max-w-2xl mx-auto"
                    style={{ fontFamily: "var(--font-body)", lineHeight: "1.6" }}
                >
                    Hackathons &bull; Competitions &bull; Workshops &bull; Startup Arena
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={onRegisterClick}
                        className="px-8 py-4 bg-[#A294F9] text-white text-base font-semibold rounded-2xl
              shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_16px_-4px_rgba(162,148,249,0.6)]
              hover:bg-[#8B7AE8] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_24px_-4px_rgba(162,148,249,0.7)]
              transition-all duration-200 cursor-pointer"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Register Now
                    </button>
                    <a
                        href="#schedule"
                        className="px-8 py-4 bg-white/40 backdrop-blur-sm text-[#2D2B3A] text-base font-semibold rounded-2xl
              border border-[#A294F9]/30
              hover:bg-white/60 hover:border-[#A294F9]/50
              transition-all duration-200"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        View Schedule
                    </a>
                </div>
            </div>
        </section>
    )
}
