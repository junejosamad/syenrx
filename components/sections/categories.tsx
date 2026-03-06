"use client"

import { categories } from "@/data/competitions"

export function Categories() {
    return (
        <section id="categories" className="bg-[#F5EFFF] py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2B3A] mb-4"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                    >
                        Explore Categories
                    </h2>
                    <p
                        className="text-base text-[#6B6680] max-w-xl mx-auto"
                        style={{ fontFamily: "var(--font-body)", lineHeight: "1.6" }}
                    >
                        Dive into the tracks that matter. From artificial intelligence to cybersecurity.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <a
                            key={cat.id}
                            href="#schedule"
                            className="group backdrop-blur-md bg-white/30 border border-white/40 rounded-3xl p-6
                transition-all duration-300 ease-out
                hover:bg-white/50 hover:border-[#A294F9]/40
                hover:shadow-[0_0_24px_-5px_rgba(162,148,249,0.4)]
                hover:scale-[1.02]
                cursor-pointer"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                                    {cat.icon}
                                </span>
                                <div>
                                    <h3
                                        className="text-lg font-bold text-[#2D2B3A]"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {cat.title}
                                    </h3>
                                    <span
                                        className="text-xs text-[#A294F9] font-medium"
                                        style={{ fontFamily: "var(--font-mono)" }}
                                    >
                                        {cat.eventCount} events
                                    </span>
                                </div>
                            </div>
                            <p
                                className="text-sm text-[#6B6680] leading-relaxed"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                {cat.description}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
