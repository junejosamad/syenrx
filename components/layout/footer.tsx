export function Footer() {
    return (
        <footer className="bg-[#2D2B3A] text-white mt-0">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h3
                            className="text-2xl font-bold mb-4"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            SynerX
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                            Pakistan&apos;s next generation tech convergence. Hackathons, competitions, workshops, and
                            the startup arena — all under one roof.
                        </p>
                    </div>

                    {/* Event */}
                    <div>
                        <h4
                            className="font-bold mb-4 text-[10px] uppercase tracking-[0.1em] text-white/40"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Event
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#competitions" className="text-white/60 hover:text-white transition text-sm">
                                    Competitions
                                </a>
                            </li>
                            <li>
                                <a href="#schedule" className="text-white/60 hover:text-white transition text-sm">
                                    Schedule
                                </a>
                            </li>
                            <li>
                                <a href="#speakers" className="text-white/60 hover:text-white transition text-sm">
                                    Speakers
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4
                            className="font-bold mb-4 text-[10px] uppercase tracking-[0.1em] text-white/40"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Connect
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                                    Twitter / X
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4
                            className="font-bold mb-4 text-[10px] uppercase tracking-[0.1em] text-white/40"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Legal
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                                    Code of Conduct
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-sm">
                        &copy; 2026 SynerX. All rights reserved.
                    </p>
                    <p className="text-white/40 text-sm font-medium">
                        Developed by ByteCraftSoft x Abdul Samad
                    </p>
                </div>
            </div>
        </footer>
    )
}
