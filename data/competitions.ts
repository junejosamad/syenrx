import { Competition, Category, Sponsor } from "@/types/event"

export const competitions: Competition[] = [
    {
        id: "comp-1",
        title: "Hackathon",
        description:
            "48-hour marathon building innovative solutions. Form teams and create something extraordinary.",
        icon: "💻",
        prizePool: "$15,000",
    },
    {
        id: "comp-2",
        title: "AI Challenge",
        description:
            "Push the boundaries of machine learning. Build models that solve real-world problems.",
        icon: "🤖",
        prizePool: "$10,000",
    },
    {
        id: "comp-3",
        title: "Speed Programming",
        description:
            "Race against time solving algorithmic challenges. The fastest and most elegant solutions win.",
        icon: "⚡",
        prizePool: "$5,000",
    },
    {
        id: "comp-4",
        title: "Game Dev Jam",
        description:
            "Create a playable game in a day. Theme revealed at the start — creativity meets execution.",
        icon: "🎮",
        prizePool: "$8,000",
    },
    {
        id: "comp-5",
        title: "UI/UX Design",
        description:
            "Design beautiful, accessible interfaces for a given brief. Pixel-perfect meets user-first.",
        icon: "🎨",
        prizePool: "$5,000",
    },
    {
        id: "comp-6",
        title: "Startup Pitch",
        description:
            "Pitch your startup idea to a panel of investors and industry leaders. Real funding on the line.",
        icon: "🚀",
        prizePool: "$7,000",
    },
]

export const categories: Category[] = [
    {
        id: "cat-1",
        title: "AI & Robotics",
        icon: "🤖",
        description: "Machine learning, computer vision, NLP, and robotics workshops",
        eventCount: 12,
    },
    {
        id: "cat-2",
        title: "Web3 & Blockchain",
        icon: "⛓️",
        description: "DeFi, smart contracts, NFTs, and decentralized applications",
        eventCount: 8,
    },
    {
        id: "cat-3",
        title: "Design & Creative",
        icon: "🎨",
        description: "UI/UX, motion design, design systems, and creative coding",
        eventCount: 10,
    },
    {
        id: "cat-4",
        title: "Startup & Business",
        icon: "🚀",
        description: "Fundraising, growth hacking, product-market fit, and scaling",
        eventCount: 6,
    },
    {
        id: "cat-5",
        title: "Cloud & DevOps",
        icon: "☁️",
        description: "Infrastructure, CI/CD, containerization, and edge computing",
        eventCount: 7,
    },
    {
        id: "cat-6",
        title: "Cybersecurity",
        icon: "🛡️",
        description: "Ethical hacking, penetration testing, and security architecture",
        eventCount: 5,
    },
]

export const sponsors: Sponsor[] = [
    { id: "sp-1", name: "Google", tier: "platinum", logo: "Google" },
    { id: "sp-2", name: "Microsoft", tier: "platinum", logo: "Microsoft" },
    { id: "sp-3", name: "Meta", tier: "gold", logo: "Meta" },
    { id: "sp-4", name: "Vercel", tier: "gold", logo: "Vercel" },
    { id: "sp-5", name: "Figma", tier: "gold", logo: "Figma" },
    { id: "sp-6", name: "GitHub", tier: "silver", logo: "GitHub" },
    { id: "sp-7", name: "Notion", tier: "silver", logo: "Notion" },
    { id: "sp-8", name: "Linear", tier: "silver", logo: "Linear" },
    { id: "sp-9", name: "Stripe", tier: "silver", logo: "Stripe" },
]
