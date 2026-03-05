"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RegistrationForm } from "@/components/registration-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface EventSchedule {
  id: number
  activity_title: string
  activity_description?: string
  start_time: string
  end_time?: string
  location?: string
}

interface StepField {
  id: number
  field_name: string
  field_type: string
  is_required: boolean
  options?: string
}

interface ModuleStep {
  id: number
  title: string
  description?: string
  fields: StepField[]
}

interface EventModule {
  id: number
  title: string
  description?: string
  steps: ModuleStep[]
}

interface EventDetail {
  id: number
  title: string
  description: string
  is_team_event: boolean
  team_size?: number
  has_entry_fee: boolean
  entry_fee?: number
  payment_details?: string
  event_date: string
  registration_deadline: string
  modules: EventModule[]
  schedules: EventSchedule[]
}

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.eventId as string
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [showRegistration, setShowRegistration] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    fetchEvent()
    checkAuth()
  }, [eventId])

  const checkAuth = () => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
  }

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      // Store current page to redirect back after login
      localStorage.setItem("redirectAfterLogin", window.location.pathname)
      router.push("/auth/login")
      return
    }
    setShowRegistration(true)
  }

  const fetchEvent = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8000/api/events/${eventId}`)
      if (response.ok) {
        setEvent(await response.json())
      } else {
        router.push("/events")
      }
    } catch (error) {
      console.error("Error fetching event:", error)
      router.push("/events")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 text-foreground flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full flex justify-center items-center">
          <div className="text-pink-600 text-2xl font-bold animate-pulse">Loading event...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-pink-50 text-foreground flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full flex justify-center items-center">
          <div className="text-center">
            <p className="text-pink-800 text-2xl font-bold mb-6">Event not found</p>
            <Link href="/events">
              <Button className="bg-pink-600 text-white hover:bg-pink-700 font-bold px-8 py-4">Back to Events</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const isRegistrationOpen = new Date(event.registration_deadline) > new Date()

  return (
    <div className="min-h-screen bg-pink-50 text-foreground flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 w-full py-12">
        <Link href="/events" className="inline-block mb-12">
          <Button
            variant="outline"
            className="border-2 border-pink-300 text-pink-600 hover:bg-pink-100 bg-transparent font-medium"
          >
            ← Back to Events
          </Button>
        </Link>

        {showRegistration ? (
          // Registration Wizard View
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-4xl font-bold text-pink-900">Event Registration</h1>
              <Button onClick={() => setShowRegistration(false)} variant="ghost" className="text-pink-600 font-bold">
                Cancel
              </Button>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border-2 border-pink-100 overflow-hidden">
              <RegistrationForm eventId={eventId} event={event} onClose={() => setShowRegistration(false)} />
            </div>
          </div>
        ) : (
          // Event Detail View
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight text-pink-900">
                  {event.title}
                </h1>
                <p className="text-lg text-pink-800/80 leading-relaxed bg-white p-6 rounded-xl border border-pink-100 shadow-sm whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>

              {/* Event Schedule */}
              {event.schedules && event.schedules.length > 0 && (
                <div className="border border-pink-200 p-8 md:p-10 bg-white rounded-2xl shadow-sm">
                  <h2 className="text-3xl font-bold mb-8 tracking-tight text-pink-900 flex items-center gap-3">
                    🗓 Event Schedule & Activities
                  </h2>
                  <div className="space-y-6">
                    {event.schedules.map((schedule, idx) => (
                      <div key={schedule.id} className="flex gap-6 border-l-4 border-pink-400 pl-6 py-2">
                        <div className="min-w-[140px]">
                          <div className="text-lg font-bold text-pink-900">
                            {new Date(schedule.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          {schedule.end_time && (
                            <div className="text-sm font-semibold text-pink-600">
                              to {new Date(schedule.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          )}
                          <div className="text-xs text-pink-500 font-semibold mt-1">
                            {new Date(schedule.start_time).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{schedule.activity_title}</h3>
                          {schedule.location && (
                            <p className="text-sm font-semibold text-pink-600 mb-2">📍 {schedule.location}</p>
                          )}
                          {schedule.activity_description && (
                            <p className="text-gray-700">{schedule.activity_description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Details Card */}
              <div className="border border-pink-200 p-8 md:p-10 bg-white rounded-2xl shadow-sm">
                <h2 className="text-3xl font-bold mb-8 tracking-tight text-pink-900">Event Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-xs text-pink-600 mb-2 uppercase tracking-wider font-semibold">
                      Registration Type
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{event.is_team_event ? "Team Event" : "Individual"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-pink-600 mb-2 uppercase tracking-wider font-semibold">Entry Fee</div>
                    <div className="text-2xl font-bold text-gray-900">{event.has_entry_fee ? `$${event.entry_fee}` : "Free"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-pink-600 mb-2 uppercase tracking-wider font-semibold">Event Date</div>
                    <div className="text-xl font-bold text-gray-900">{new Date(event.event_date).toLocaleDateString()} at {new Date(event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  <div>
                    <div className="text-xs text-pink-600 mb-2 uppercase tracking-wider font-semibold">
                      Registration Deadline
                    </div>
                    <div className="text-xl font-bold text-gray-900">{new Date(event.registration_deadline).toLocaleDateString()}</div>
                  </div>
                  {event.is_team_event && event.team_size && (
                    <div className="col-span-1 md:col-span-2">
                      <div className="text-xs text-pink-600 mb-2 uppercase tracking-wider font-semibold">Team Size</div>
                      <div className="text-xl font-bold text-gray-900">{event.team_size} members per team</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modules Overview */}
              {event.modules && event.modules.length > 0 && (
                <div className="border border-pink-200 p-8 md:p-10 bg-pink-100/50 rounded-2xl">
                  <h2 className="text-2xl font-bold mb-4 tracking-tight text-pink-900">Registration Process</h2>
                  <p className="text-pink-800 mb-6">Get ready! The registration for this event involves the following steps:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.modules.map((mod, idx) => (
                      <div key={mod.id} className="bg-white p-5 rounded-xl border border-pink-200 shadow-sm flex items-start gap-4">
                        <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">{mod.title}</h4>
                          {mod.description && <p className="text-sm text-gray-600 mt-1">{mod.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Details */}
              {event.has_entry_fee && event.payment_details && (
                <div className="border border-pink-200 p-8 md:p-10 bg-white rounded-2xl shadow-sm">
                  <h2 className="text-3xl font-bold mb-6 tracking-tight text-pink-900">Payment Details</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{event.payment_details}</p>
                </div>
              )}
            </div>

            {/* Registration Sidebar */}
            <div className="lg:col-span-1">
              <div className="border-2 border-pink-600 p-8 md:p-10 rounded-2xl sticky top-24 bg-pink-600 text-white shadow-2xl">
                <div className="space-y-6">
                  {isRegistrationOpen ? (
                    <>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide opacity-90 mb-1">Status</p>
                        <p className="text-3xl font-bold">Registration Open</p>
                      </div>
                      <p className="text-pink-100 mb-4 whitespace-pre-wrap">Secure your spot for {event.title} today. Click the button below to start the step-by-step registration process.</p>

                      {isAuthenticated ? (
                        <Button
                          onClick={handleRegisterClick}
                          className="w-full px-6 py-6 bg-white text-pink-600 hover:bg-gray-100 text-xl font-bold rounded-xl shadow-lg transition-transform hover:scale-105"
                        >
                          Register Now →
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <Button
                            onClick={handleRegisterClick}
                            className="w-full px-6 py-6 bg-white text-pink-600 hover:bg-gray-100 text-xl font-bold rounded-xl shadow-lg transition-transform hover:scale-105"
                          >
                            Login to Register
                          </Button>
                          <p className="text-center text-sm font-medium opacity-90">An account is required to register.</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide opacity-90">Status</p>
                        <p className="text-3xl font-bold">Registration Closed</p>
                      </div>
                      <p className="text-pink-100 leading-relaxed">The registration deadline for this event has passed. Keep an eye out for future events!</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
