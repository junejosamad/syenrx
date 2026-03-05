"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventCard } from "@/components/event-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Event {
  id: number
  title: string
  description: string
  is_team_event: boolean
  has_entry_fee: boolean
  entry_fee?: number
  event_date: string
  registration_deadline: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "team" | "individual">("all")

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:8000/api/events/")
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = events.filter((event) => {
    if (filter === "team") return event.is_team_event
    if (filter === "individual") return !event.is_team_event
    return true
  })

  const upcomingEvents = filteredEvents.filter((event) => new Date(event.registration_deadline) > new Date())

  return (
    <div className="min-h-screen bg-pink-50 text-foreground flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 w-full py-20">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight text-pink-900">Explore Events</h1>
          <p className="text-xl text-muted max-w-2xl">
            Browse and register for upcoming events. Filter by type to find events that match your preferences.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-3 mb-16">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 font-medium transition border-2 ${filter === "all"
                ? "border-pink-600 bg-pink-600 text-white"
                : "border-pink-300 text-pink-600 hover:border-pink-600"
              }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter("team")}
            className={`px-6 py-3 font-medium transition border-2 ${filter === "team"
                ? "border-pink-600 bg-pink-600 text-white"
                : "border-pink-300 text-pink-600 hover:border-pink-600"
              }`}
          >
            Team Events
          </button>
          <button
            onClick={() => setFilter("individual")}
            className={`px-6 py-3 font-medium transition border-2 ${filter === "individual"
                ? "border-pink-600 bg-pink-600 text-white"
                : "border-pink-300 text-pink-600 hover:border-pink-600"
              }`}
          >
            Individual Events
          </button>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center text-muted py-20 text-lg">Loading events...</div>
        ) : upcomingEvents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-lg mb-6">No events available</p>
            <Link href="/">
              <Button className="bg-pink-600 text-white hover:bg-pink-700 font-medium">Back to Home</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {upcomingEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <EventCard event={event} />
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
