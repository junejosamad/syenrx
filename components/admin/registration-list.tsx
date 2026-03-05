"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Registration {
  id: number
  user_id: number
  user?: {
    id: number
    username: string
    email: string
  }
  registration_type: string
  team?: {
    team_name: string
  }
  status: string
  payment_proof_path?: string
  is_payment_verified: boolean
  registration_date: string
  form_responses?: Array<{
    field_id: number
    response_value: string
  }>
}

interface RegistrationListProps {
  registrations: Registration[]
  eventId: string
  onStatusUpdated: () => void
}

export function RegistrationList({ registrations, eventId, onStatusUpdated }: RegistrationListProps) {
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const handleStatusUpdate = async (registrationId: number, newStatus: string) => {
    setUpdatingId(registrationId)
    try {
      const response = await fetch(`http://localhost:8000/api/registrations/${registrationId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, admin_id: 1 }),
      })

      if (response.ok) {
        onStatusUpdated()
      }
    } catch (error) {
      console.error("Error updating status:", error)
    } finally {
      setUpdatingId(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-500"
      case "rejected":
        return "text-red-500"
      default:
        return "text-yellow-500"
    }
  }

  return (
    <div className="space-y-4">
      {registrations.map((registration) => (
        <div key={registration.id} className="border border-border p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Registration #{registration.id}</h3>
              <div className="space-y-1 text-sm">
                {registration.user && (
                  <>
                    <div>
                      <strong>Name:</strong> {registration.user.username}
                    </div>
                    <div>
                      <strong>Email:</strong> {registration.user.email}
                    </div>
                  </>
                )}
                <div>
                  <strong>Type:</strong> {registration.registration_type === "team" ? "Team" : "Individual"}
                </div>
                {registration.team && (
                  <div>
                    <strong>Team Name:</strong> {registration.team.team_name}
                  </div>
                )}
                <div>
                  <strong>Status:</strong>{" "}
                  <span className={getStatusColor(registration.status)}>{registration.status.toUpperCase()}</span>
                </div>
                <div>
                  <strong>Date:</strong> {new Date(registration.registration_date).toLocaleDateString()}
                </div>

                {/* Custom Form Field Responses */}
                {registration.form_responses && registration.form_responses.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="font-semibold mb-2">Additional Information:</div>
                    {registration.form_responses.map((response, idx) => (
                      <div key={idx} className="ml-2">
                        <strong>Field #{response.field_id}:</strong> {response.response_value}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {registration.payment_proof_path && (
              <div>
                <div className="text-sm text-muted mb-2">Payment Proof Uploaded</div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={registration.is_payment_verified}
                    onChange={() => {
                      // Add verification logic here
                    }}
                  />
                  <span className="text-sm">Verified</span>
                </label>
              </div>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => handleStatusUpdate(registration.id, "confirmed")}
              disabled={updatingId === registration.id}
              className="px-4 py-2 bg-green-600 text-white hover:bg-green-700"
            >
              Confirm
            </Button>
            <Button
              onClick={() => handleStatusUpdate(registration.id, "pending")}
              disabled={updatingId === registration.id}
              variant="outline"
              className="px-4 py-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
            >
              Pending
            </Button>
            <Button
              onClick={() => handleStatusUpdate(registration.id, "rejected")}
              disabled={updatingId === registration.id}
              variant="outline"
              className="px-4 py-2 border-red-500 text-red-500 hover:bg-red-500/10"
            >
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
