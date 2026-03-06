import { GlassCard } from "@/components/ui/glass-card"

const highlights = [
    {
        icon: "💻",
        title: "Hackathons",
        description:
            "48-hour coding marathons where teams build innovative solutions to real-world challenges. Mentored by industry experts.",
    },
    {
        icon: "🎓",
        title: "Workshops",
        description:
            "Hands-on sessions covering AI, cloud, design, and more. Learn directly from practitioners at top tech companies.",
    },
    {
        icon: "🚀",
        title: "Startup Arena",
        description:
            "Pitch your ideas to investors, get mentored by founders, and compete for seed funding. Your startup journey starts here.",
    },
]

export function Highlights() {
    return (
        <section className="bg-[#F5EFFF] py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2B3A] mb-4"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                    >
                        Why SynerX?
                    </h2>
                    <p
                        className="text-base text-[#6B6680] max-w-xl mx-auto"
                        style={{ fontFamily: "var(--font-body)", lineHeight: "1.6" }}
                    >
                        Three days of immersive tech experiences designed to inspire, educate, and connect.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {highlights.map((item) => (
                        <GlassCard key={item.title} className="relative overflow-hidden">
                            {/* Gradient fade bottom-right */}
                            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#CDC1FF]/30 to-transparent rounded-tl-full pointer-events-none" />
                            <div className="relative z-10">
                                <span className="text-4xl mb-4 block">{item.icon}</span>
                                <h3
                                    className="text-xl font-bold text-[#2D2B3A] mb-3"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="text-sm text-[#6B6680] leading-relaxed"
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    )
}
