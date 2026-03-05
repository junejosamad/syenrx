"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { RegistrationList } from "@/components/admin/registration-list"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ManageEventPage() {
  const params = useParams()
  const eventId = params.eventId as string
  const [event, setEvent] = useState<any>(null)
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEventAndRegistrations()
  }, [eventId])

  const fetchEventAndRegistrations = async () => {
    setLoading(true)
    try {
      const [eventRes, regRes] = await Promise.all([
        fetch(`http://localhost:8000/api/events/${eventId}`),
        fetch(`http://localhost:8000/api/registrations/event/${eventId}`),
      ])

      if (eventRes.ok) {
        setEvent(await eventRes.json())
      }
      if (regRes.ok) {
        setRegistrations(await regRes.json())
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center text-muted">Loading...</div>
        </main>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center text-muted">Event not found</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <Link href="/admin/dashboard">
            <Button variant="outline" className="mb-6 border-foreground text-foreground hover:bg-card bg-transparent">
              ← Back to Dashboard
            </Button>
          </Link>

          <h1 className="text-5xl font-bold mb-4">{event.title}</h1>
          <p className="text-muted text-lg leading-relaxed mb-8">{event.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border border-border p-6">
            <div>
              <div className="text-sm text-muted mb-1">Event Type</div>
              <div className="text-xl font-semibold">{event.is_team_event ? "Team" : "Individual"}</div>
            </div>
            <div>
              <div className="text-sm text-muted mb-1">Entry Fee</div>
              <div className="text-xl font-semibold">{event.has_entry_fee ? `$${event.entry_fee}` : "Free"}</div>
            </div>
            <div>
              <div className="text-sm text-muted mb-1">Registrations</div>
              <div className="text-xl font-semibold">{registrations.length}</div>
            </div>
            <div>
              <div className="text-sm text-muted mb-1">Event Date</div>
              <div className="text-xl font-semibold">{new Date(event.event_date).toLocaleDateString()}</div>
            </div>
          </div>

          {event.has_entry_fee && (
            <div className="border border-border p-6 mb-8">
              <h2 className="text-2xl font-bold mb-2">Payment Details</h2>
              <p className="text-muted whitespace-pre-wrap">{event.payment_details}</p>
            </div>
          )}
        </div>

        <h2 className="text-3xl font-bold mb-8">Registrations ({registrations.length})</h2>
        {registrations.length === 0 ? (
          <div className="text-center text-muted py-12">No registrations yet</div>
        ) : (
          <RegistrationList
            registrations={registrations}
            eventId={eventId}
            onStatusUpdated={fetchEventAndRegistrations}
          />
        )}
      </main>
    </div>
  )
}
