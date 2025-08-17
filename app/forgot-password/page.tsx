"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address.")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSuccess(true)
      setMessage("Password reset instructions have been sent to your email address.")
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Mail className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Forgot Password?</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email address and we'll send you instructions to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {message && !isSuccess && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{message}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending Instructions..." : "Send Reset Instructions"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">{message}</AlertDescription>
              </Alert>
              <p className="text-sm text-gray-600">
                Check your email and follow the instructions to reset your password.
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/reset-password")}
              className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 hover:underline font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Reset Password
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
