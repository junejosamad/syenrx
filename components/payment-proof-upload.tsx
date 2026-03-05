"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface PaymentProofUploadProps {
  registrationId: number
  eventId: number
  eventHasEntryFee: boolean
  onUploadComplete: () => void
}

export function PaymentProofUpload({
  registrationId,
  eventId,
  eventHasEntryFee,
  onUploadComplete,
}: PaymentProofUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Validate file type
      if (!["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(selectedFile.type)) {
        setError("Please upload a valid image (JPG, PNG) or PDF file")
        return
      }

      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB")
        return
      }

      setFile(selectedFile)
      setError("")

      // Create preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(selectedFile)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError("Please select a file")
      return
    }

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(`http://localhost:8000/api/registrations/${registrationId}/upload-payment-proof`, {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setSuccess(true)
        setFile(null)
        setPreview(null)
        setTimeout(() => {
          onUploadComplete()
        }, 2000)
      } else {
        setError("Failed to upload payment proof")
      }
    } catch (err) {
      setError("Error uploading file")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!eventHasEntryFee) {
    return null
  }

  if (success) {
    return (
      <div className="border border-green-500 bg-green-500/10 p-6">
        <p className="text-green-500 font-semibold mb-2">Payment Proof Uploaded Successfully</p>
        <p className="text-muted text-sm">The admin will verify your payment proof shortly.</p>
      </div>
    )
  }

  return (
    <div className="border border-border p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">Payment Proof</h2>
      <p className="text-muted mb-6">Please upload proof of your payment to complete registration.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="border-2 border-dashed border-border p-8 text-center hover:border-foreground transition">
          <input type="file" onChange={handleFileChange} accept="image/*,.pdf" className="hidden" id="payment-file" />
          <label htmlFor="payment-file" className="cursor-pointer block">
            {file ? (
              <div>
                <p className="font-semibold mb-2">{file.name}</p>
                <p className="text-sm text-muted">Click to change file</p>
              </div>
            ) : (
              <div>
                <p className="font-semibold mb-2">Drag and drop your payment proof here</p>
                <p className="text-sm text-muted">or click to select file</p>
                <p className="text-xs text-muted mt-2">Supported: JPG, PNG, PDF (Max 5MB)</p>
              </div>
            )}
          </label>
        </div>

        {preview && (
          <div>
            <p className="text-sm font-semibold mb-2">Preview</p>
            <img
              src={preview || "/placeholder.svg"}
              alt="Payment proof preview"
              className="max-w-xs max-h-64 border border-border"
            />
          </div>
        )}

        <Button
          type="submit"
          disabled={!file || loading}
          className="px-6 py-3 bg-foreground text-background hover:bg-muted disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Payment Proof"}
        </Button>
      </form>
    </div>
  )
}
