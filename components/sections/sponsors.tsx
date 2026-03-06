import { sponsors } from "@/data/competitions"

export function Sponsors() {
    const platinum = sponsors.filter((s) => s.tier === "platinum")
    const gold = sponsors.filter((s) => s.tier === "gold")
    const silver = sponsors.filter((s) => s.tier === "silver")

    return (
        <section id="sponsors" className="bg-[#F5EFFF] py-24 sm:py-32">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2B3A] mb-4"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                    >
                        Our Sponsors
                    </h2>
                    <p
                        className="text-base text-[#6B6680] max-w-xl mx-auto"
                        style={{ fontFamily: "var(--font-body)", lineHeight: "1.6" }}
                    >
                        Backed by the world&apos;s most innovative companies.
                    </p>
                </div>

                {/* Platinum */}
                <div className="mb-12">
                    <p
                        className="text-center text-[10px] uppercase tracking-[0.15em] text-[#6B6680] font-medium mb-6"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Platinum Partners
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {platinum.map((s) => (
                            <div
                                key={s.id}
                                className="backdrop-blur-md bg-white/50 border border-white/50 rounded-2xl px-10 py-6
                  text-xl font-bold text-[#2D2B3A]/70 hover:text-[#A294F9] transition-colors
                  shadow-[0_2px_12px_-2px_rgba(162,148,249,0.15)]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {s.logo}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gold */}
                <div className="mb-12">
                    <p
                        className="text-center text-[10px] uppercase tracking-[0.15em] text-[#6B6680] font-medium mb-6"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Gold Partners
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {gold.map((s) => (
                            <div
                                key={s.id}
                                className="backdrop-blur-md bg-white/40 border border-white/40 rounded-2xl px-8 py-4
                  text-base font-semibold text-[#2D2B3A]/60 hover:text-[#A294F9] transition-colors"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {s.logo}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Silver */}
                <div>
                    <p
                        className="text-center text-[10px] uppercase tracking-[0.15em] text-[#6B6680] font-medium mb-6"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Silver Partners
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {silver.map((s) => (
                            <div
                                key={s.id}
                                className="bg-white/30 border border-white/30 rounded-xl px-6 py-3
                  text-sm font-medium text-[#6B6680] hover:text-[#A294F9] transition-colors"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {s.logo}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
