export type Speaker = {
    id: string
    name: string
    role: string
    company: string
    topic: string
    image: string
    bio: string
    socials: {
        twitter?: string
        linkedin?: string
        github?: string
    }
}

export type ScheduleItem = {
    id: string
    time: string
    title: string
    speaker: string
    speakerImage: string
    category: "ai" | "web3" | "design" | "startup" | "general"
    day: 1 | 2
}

export type Competition = {
    id: string
    title: string
    description: string
    icon: string
    prizePool: string
}

export type Sponsor = {
    id: string
    name: string
    tier: "platinum" | "gold" | "silver"
    logo: string
}

export type Category = {
    id: string
    title: string
    icon: string
    description: string
    eventCount: number
}
