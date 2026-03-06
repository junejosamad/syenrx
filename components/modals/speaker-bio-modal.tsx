"use client"

import type { Speaker } from "@/types/event"

interface SpeakerBioModalProps {
    speaker: Speaker
    onClose: () => void
}

export function SpeakerBioModal({ speaker, onClose }: SpeakerBioModalProps) {
    const initials = speaker.name.split(" ").map((n) => n[0]).join("")

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#2D2B3A]/40 backdrop-blur-sm" />

            {/* Card */}
            <div
                className="relative w-full max-w-[440px] bg-white rounded-3xl overflow-hidden shadow-2xl p-8 text-center"
                style={{ animation: "modal-spring-in 0.4s ease-out" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5EFFF] text-[#6B6680] flex items-center justify-center
            hover:bg-[#E5D9F2] transition-colors text-sm cursor-pointer"
                >
                    ✕
                </button>

                {/* Avatar with rotating gradient border */}
                <div className="relative w-[128px] h-[128px] mx-auto mb-6">
                    {/* Rotating border */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: "conic-gradient(from 0deg, #A294F9, #CDC1FF, #E5D9F2, #A294F9)",
                            animation: "rotate-gradient 4s linear infinite",
                            padding: "2px",
                        }}
                    >
                        <div className="w-full h-full rounded-full bg-white" />
                    </div>
                    {/* Avatar content */}
                    <div
                        className="absolute inset-[4px] rounded-full bg-gradient-to-br from-[#A294F9] to-[#CDC1FF] flex items-center justify-center text-white text-3xl font-bold"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        {initials}
                    </div>
                </div>

                {/* Name */}
                <h2
                    className="text-2xl font-bold text-[#2D2B3A] mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {speaker.name}
                </h2>

                {/* Role */}
                <p
                    className="text-sm text-[#A294F9] font-medium mb-4"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    {speaker.role} @ {speaker.company}
                </p>

                {/* Bio */}
                <p
                    className="text-sm text-[#6B6680] leading-relaxed mb-6 text-left"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    {speaker.bio}
                </p>

                {/* Topic tag */}
                <div className="mb-6">
                    <span
                        className="inline-block text-xs px-4 py-1.5 rounded-full bg-[#F5EFFF] text-[#A294F9] font-medium border border-[#E5D9F2]"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        🎤 {speaker.topic}
                    </span>
                </div>

                {/* Socials */}
                <div className="flex justify-center gap-4">
                    {speaker.socials.twitter && (
                        <a
                            href={speaker.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-[#F5EFFF] flex items-center justify-center
                text-[#6B6680] hover:text-[#A294F9] hover:bg-[#E5D9F2] transition-colors"
                            aria-label="Twitter"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    )}
                    {speaker.socials.linkedin && (
                        <a
                            href={speaker.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-[#F5EFFF] flex items-center justify-center
                text-[#6B6680] hover:text-[#A294F9] hover:bg-[#E5D9F2] transition-colors"
                            aria-label="LinkedIn"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    )}
                    {speaker.socials.github && (
                        <a
                            href={speaker.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-[#F5EFFF] flex items-center justify-center
                text-[#6B6680] hover:text-[#A294F9] hover:bg-[#E5D9F2] transition-colors"
                            aria-label="GitHub"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
