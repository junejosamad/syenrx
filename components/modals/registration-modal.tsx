"use client"

import { useState } from "react"
import Link from "next/link"
import { registerAttendee } from "@/lib/api"

interface RegistrationModalProps {
    isOpen: boolean
    onClose: () => void
}

type TicketType = "hacker" | "vip"

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
    const [selectedTicket, setSelectedTicket] = useState<TicketType>("hacker")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            await registerAttendee({
                name,
                email,
                phone: phone || undefined,
                ticket_type: selectedTicket,
            })
            setSubmitted(true)
        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        onClose()
        // Reset state after close animation
        setTimeout(() => {
            setSubmitted(false)
            setError(null)
            setName("")
            setEmail("")
            setPhone("")
            setSelectedTicket("hacker")
        }, 200)
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            onClick={handleClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#2D2B3A]/40 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative w-full max-w-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl"
                style={{
                    animation: "modal-spring-in 0.4s ease-out",
                    background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAFE 100%)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-8 pt-8 pb-0 flex items-center justify-between">
                    <h2
                        className="text-2xl font-bold text-[#2D2B3A]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        {submitted ? "You're In!" : "Secure Your Spot"}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 rounded-full bg-[#F5EFFF] text-[#6B6680] flex items-center justify-center
              hover:bg-[#E5D9F2] transition-colors text-sm cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {submitted ? (
                    /* ─── Success State ─── */
                    <div className="px-8 pt-8 pb-10 text-center">
                        {/* Checkmark */}
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#A294F9] flex items-center justify-center">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h3
                            className="text-xl font-bold text-[#2D2B3A] mb-2"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Registration Complete
                        </h3>
                        <p
                            className="text-sm text-[#6B6680] mb-8"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Check your email for your {selectedTicket === "vip" ? "VIP" : "Hacker"} pass
                            confirmation and event details.
                        </p>
                        <button
                            onClick={handleClose}
                            className="px-8 py-3 bg-[#A294F9] text-white text-sm font-semibold rounded-xl
                hover:bg-[#8B7AE8] transition-all cursor-pointer"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    /* ─── Form State ─── */
                    <form onSubmit={handleSubmit}>
                        <div className="px-8 pt-6 pb-8">
                            {/* Error Banner */}
                            {error && (
                                <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {error}
                                </div>
                            )}

                            {/* Ticket Types */}
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                <button
                                    type="button"
                                    onClick={() => setSelectedTicket("hacker")}
                                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${selectedTicket === "hacker"
                                        ? "border-[#A294F9] bg-[#F5EFFF]"
                                        : "border-[#E5D9F2] bg-white hover:border-[#CDC1FF]"
                                        }`}
                                >
                                    <p
                                        className="text-sm font-bold text-[#2D2B3A] mb-1"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        Hacker Pass
                                    </p>
                                    <p
                                        className="text-lg font-bold text-[#A294F9]"
                                        style={{ fontFamily: "var(--font-mono)" }}
                                    >
                                        Free
                                    </p>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedTicket("vip")}
                                    className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${selectedTicket === "vip"
                                        ? "border-[#A294F9] bg-[#F5EFFF]"
                                        : "border-[#E5D9F2] bg-white hover:border-[#CDC1FF]"
                                        }`}
                                >
                                    <span
                                        className="absolute -top-2 right-3 text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#A294F9] text-white rounded-full font-semibold"
                                        style={{ fontFamily: "var(--font-body)" }}
                                    >
                                        Most Popular
                                    </span>
                                    <p
                                        className="text-sm font-bold text-[#2D2B3A] mb-1"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        VIP Access
                                    </p>
                                    <p
                                        className="text-lg font-bold text-[#A294F9]"
                                        style={{ fontFamily: "var(--font-mono)" }}
                                    >
                                        $50
                                    </p>
                                </button>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-4">
                                <div>
                                    <label
                                        className="block text-xs font-medium uppercase tracking-[0.05em] text-[#6B6680] mb-1.5"
                                        style={{ fontFamily: "var(--font-body)" }}
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-[#F9FAFB] border-b-2 border-[#E5D9F2] rounded-t-xl
                      text-[#2D2B3A] text-sm focus:outline-none focus:border-[#A294F9] transition-colors"
                                        style={{ fontFamily: "var(--font-body)" }}
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-xs font-medium uppercase tracking-[0.05em] text-[#6B6680] mb-1.5"
                                        style={{ fontFamily: "var(--font-body)" }}
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-[#F9FAFB] border-b-2 border-[#E5D9F2] rounded-t-xl
                      text-[#2D2B3A] text-sm focus:outline-none focus:border-[#A294F9] transition-colors"
                                        style={{ fontFamily: "var(--font-body)" }}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-xs font-medium uppercase tracking-[0.05em] text-[#6B6680] mb-1.5"
                                        style={{ fontFamily: "var(--font-body)" }}
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#F9FAFB] border-b-2 border-[#E5D9F2] rounded-t-xl
                      text-[#2D2B3A] text-sm focus:outline-none focus:border-[#A294F9] transition-colors"
                                        style={{ fontFamily: "var(--font-body)" }}
                                        placeholder="+92 300 1234567"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="px-8 pb-8">
                            <button
                                type="submit"
                                disabled={isSubmitting || !name || !email}
                                className="w-full py-4 bg-[#A294F9] text-white text-base font-semibold rounded-2xl
                  shadow-[0_4px_16px_-4px_rgba(162,148,249,0.6)]
                  hover:bg-[#8B7AE8] disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 cursor-pointer"
                                style={{ fontFamily: "var(--font-body)", height: "56px" }}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Registering...
                                    </span>
                                ) : (
                                    `Register — ${selectedTicket === "vip" ? "$50" : "Free"}`
                                )}
                            </button>
                            <p className="text-center text-[#6B6680] mt-6 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                Already have an account?{" "}
                                <Link href="/auth/login" className="text-[#A294F9] font-semibold hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
