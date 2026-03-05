"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { PaymentProofUpload } from "@/components/payment-proof-upload"
import { CustomFormResponse } from "@/components/custom-form-response"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RegistrationFormPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.eventId as string
  const registrationId = params.registrationId as string
  const [event, setEvent] = useState<any>(null)
  const [formFields, setFormFields] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [eventId])

  const fetchData = async () => {
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
        setFormFields(await fieldsRes.json())
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

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/events">
          <Button variant="outline" className="mb-8 border-foreground text-foreground hover:bg-card bg-transparent">
            ← Back to Events
          </Button>
        </Link>

        <h1 className="text-5xl font-bold mb-2">{event.title}</h1>
        <p className="text-muted text-lg mb-12">Complete your registration</p>

        <PaymentProofUpload
          registrationId={Number.parseInt(registrationId)}
          eventId={Number.parseInt(eventId)}
          eventHasEntryFee={event.has_entry_fee}
          onUploadComplete={() => {
            // Optionally redirect or show success message
            console.log("Payment proof uploaded")
          }}
        />

        {formFields.length > 0 && (
          <CustomFormResponse
            registrationId={Number.parseInt(registrationId)}
            eventId={Number.parseInt(eventId)}
            formFields={formFields}
          />
        )}
      </main>
    </div>
  )
}
