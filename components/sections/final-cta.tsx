"use client"

interface FinalCTAProps {
    onRegisterClick: () => void
}

export function FinalCTA({ onRegisterClick }: FinalCTAProps) {
    return (
        <section className="bg-[#F5EFFF] py-24 sm:py-32">
            <div className="max-w-5xl mx-auto px-6">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#A294F9] to-[#7B6AD4] px-8 md:px-16 py-16 md:py-20 text-center">
                    {/* Decorative blobs */}
                    <div
                        className="absolute top-0 right-0 w-60 h-60 rounded-full opacity-20"
                        style={{
                            background: "radial-gradient(circle, #CDC1FF, transparent 70%)",
                            filter: "blur(60px)",
                        }}
                        aria-hidden="true"
                    />
                    <div
                        className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-20"
                        style={{
                            background: "radial-gradient(circle, #FFFFFF, transparent 70%)",
                            filter: "blur(50px)",
                        }}
                        aria-hidden="true"
                    />

                    <div className="relative z-10">
                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                        >
                            Ready to Be Part of It?
                        </h2>
                        <p
                            className="text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-10"
                            style={{ fontFamily: "var(--font-body)", lineHeight: "1.6" }}
                        >
                            Join 2000+ innovators, builders, and visionaries at Pakistan&apos;s biggest tech convergence. Secure your spot today.
                        </p>
                        <button
                            onClick={onRegisterClick}
                            className="px-10 py-4 bg-white text-[#A294F9] text-base font-bold rounded-2xl
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)]
                hover:bg-white/90 hover:shadow-[0_6px_28px_-4px_rgba(0,0,0,0.3)]
                transition-all duration-200 cursor-pointer"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Register Now →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
