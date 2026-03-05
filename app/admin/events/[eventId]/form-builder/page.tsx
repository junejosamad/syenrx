"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { FormBuilder } from "@/components/admin/form-builder"
import { FormPreview } from "@/components/admin/form-preview"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FormBuilderPage() {
  const params = useParams()
  const eventId = params.eventId as string
  const [event, setEvent] = useState<any>(null)
  const [fields, setFields] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    fetchEventAndFields()
  }, [eventId])

  const fetchEventAndFields = async () => {
    setLoading(true)
    try {
      const [eventRes, fieldsRes] = await Promise.all([
        fetch(`http://localhost:8000/api/events/${eventId}`),
        fetch(`http://localhost:8000/api/events/${eventId}/form-fields`),
      ])

      if (eventRes.ok) {
        setEvent(await eventRes.json())
      }
      if (fieldsRes.ok) {
        setFields(await fieldsRes.json())
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href={`/admin/events/${eventId}/manage`}>
            <Button variant="outline" className="mb-6 border-foreground text-foreground hover:bg-card bg-transparent">
              ← Back to Event
            </Button>
          </Link>
          <h1 className="text-5xl font-bold mb-2">Form Builder</h1>
          <p className="text-muted">Customize the registration form for {event?.title}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FormBuilder eventId={eventId} fields={fields} onFieldsUpdated={fetchEventAndFields} />
          </div>

          <div>
            <div className="border border-border p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-4">Preview</h2>
              <p className="text-muted text-sm mb-4">See how your form will look to registrants</p>
              <Button
                onClick={() => setShowPreview(!showPreview)}
                className="w-full px-4 py-3 bg-foreground text-background hover:bg-muted mb-4"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>

              {showPreview && (
                <div className="border border-border p-4 bg-card">
                  <FormPreview fields={fields} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
