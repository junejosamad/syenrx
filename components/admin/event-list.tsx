"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Event {
  id: number
  title: string
  description: string
  is_team_event: boolean
  has_entry_fee: boolean
  event_date: string
  registration_deadline: string
}

interface EventListProps {
  events: Event[]
  onEventUpdated: () => void
}

export function EventList({ events, onEventUpdated }: EventListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (eventId: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    setDeletingId(eventId)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:8000/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })

      if (response.ok) {
        onEventUpdated()
      }
    } catch (error) {
      console.error("Error deleting event:", error)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <div key={event.id} className="border border-border p-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-2">{event.title}</h3>
              <p className="text-muted leading-relaxed mb-4">{event.description}</p>

              <div className="flex gap-8 text-sm mb-4">
                <span>
                  <strong>Type:</strong> {event.is_team_event ? "Team" : "Individual"}
                </span>
                <span>
                  <strong>Fee:</strong> {event.has_entry_fee ? "Yes" : "No"}
                </span>
                <span>
                  <strong>Event:</strong> {new Date(event.event_date).toLocaleDateString()}
                </span>
                <span>
                  <strong>Deadline:</strong> {new Date(event.registration_deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href={`/admin/events/${event.id}/manage`}>
              <Button className="px-6 py-2 bg-foreground text-background hover:bg-muted">Manage</Button>
            </Link>
            <Link href={`/admin/events/${event.id}/form-builder`}>
              <Button
                variant="outline"
                className="px-6 py-2 border-foreground text-foreground hover:bg-card bg-transparent"
              >
                Build Form
              </Button>
            </Link>
            <Button
              onClick={() => handleDelete(event.id)}
              disabled={deletingId === event.id}
              variant="outline"
              className="px-6 py-2 border-red-500 text-red-500 hover:bg-red-500/10"
            >
              {deletingId === event.id ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
