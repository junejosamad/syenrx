const API_BASE = "http://localhost:8000"

export interface RegisterData {
    name: string
    email: string
    phone?: string
    ticket_type: "hacker" | "vip"
}

export interface RegisterResponse {
    id: number
    email: string
    ticket_type: string
    message: string
}

export interface LandingStats {
    total_registrations: number
    total_events: number
    total_prize_pool: string
}

export async function registerAttendee(data: RegisterData): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE}/api/landing/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "Registration failed" }))
        throw new Error(error.detail || "Registration failed")
    }

    return response.json()
}

export async function fetchLandingStats(): Promise<LandingStats> {
    const response = await fetch(`${API_BASE}/api/landing/stats`)

    if (!response.ok) {
        throw new Error("Failed to fetch stats")
    }

    return response.json()
}
