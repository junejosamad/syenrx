"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventCreationForm } from "@/components/admin/event-creation-form"
import { EventList } from "@/components/admin/event-list"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const [events, setEvents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const adminToken = document.cookie.includes("adminToken")
    if (!adminToken) {
      router.push("/admin/login")
      return
    }
    fetchEvents()
  }, [router])

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

  const handleEventCreated = () => {
    setShowForm(false)
    fetchEvents()
  }

  const handleLogout = () => {
    document.cookie = "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-green-50 text-foreground flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 w-full py-12">
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-8 mb-2">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
              <p className="text-muted text-lg mt-3">Create and manage your events</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setShowForm(!showForm)}
                className="px-8 py-6 bg-green-600 text-white hover:bg-green-700 font-bold text-lg rounded-lg"
              >
                {showForm ? "Cancel" : "+ Create Event"}
              </Button>
              <Button
                onClick={handleLogout}
                className="px-8 py-6 bg-red-600 text-white hover:bg-red-700 font-bold text-lg rounded-lg"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Event Creation Form */}
        {showForm && (
          <div className="mb-16 border-2 border-border p-8 md:p-12 bg-white rounded-2xl shadow-lg">
            <h2 className="text-4xl font-bold mb-10 tracking-tight text-gray-900">Create New Event</h2>
            <EventCreationForm onEventCreated={handleEventCreated} />
          </div>
        )}

        {/* Events List */}
        <div className="border-t border-border pt-16">
          <h2 className="text-3xl font-bold mb-10 tracking-tight text-gray-900">Your Events</h2>
          {loading ? (
            <div className="text-center text-muted py-12 text-lg">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted text-lg mb-8">No events yet. Create your first event to get started!</p>
              <Button
                onClick={() => setShowForm(true)}
                className="px-8 py-6 bg-green-600 text-white hover:bg-green-700 font-bold text-lg rounded-lg"
              >
                Create First Event
              </Button>
            </div>
          ) : (
            <EventList events={events} onEventUpdated={fetchEvents} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
