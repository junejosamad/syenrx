"use client"

export function BlobBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {/* Blob 1 — Primary Purple */}
            <div
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-60"
                style={{
                    background: "radial-gradient(circle, #A294F9 0%, transparent 70%)",
                    filter: "blur(100px)",
                    animation: "blob-float-1 18s ease-in-out infinite",
                    willChange: "transform",
                }}
            />
            {/* Blob 2 — Soft Lavender */}
            <div
                className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full opacity-50"
                style={{
                    background: "radial-gradient(circle, #CDC1FF 0%, transparent 70%)",
                    filter: "blur(100px)",
                    animation: "blob-float-2 22s ease-in-out infinite",
                    willChange: "transform",
                }}
            />
            {/* Blob 3 — White/Light */}
            <div
                className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] rounded-full opacity-40"
                style={{
                    background: "radial-gradient(circle, #FFFFFF 0%, transparent 70%)",
                    filter: "blur(100px)",
                    animation: "blob-float-3 20s ease-in-out infinite",
                    willChange: "transform",
                }}
            />
        </div>
    )
}
