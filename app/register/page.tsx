"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerUser } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            phone: formData.get("phone") as string,
            address: formData.get("address") as string,
        }

        try {
            const result = await registerUser(data)

            if (result.error) {
                setError(result.error)
            } else {
                router.push("/login")
            }
        } catch (error) {
            setError("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4">
            <Card className="w-full max-w-md animate-scale-in">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 gradient-primary h-16 w-16 rounded-full flex items-center justify-center">
                        <span className="text-4xl">🍔</span>
                    </div>
                    <CardTitle className="text-3xl">Create Account</CardTitle>
                    <CardDescription>Join FoodieGo and start ordering</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name *</label>
                            <Input
                                type="text"
                                name="name"
                                required
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email *</label>
                            <Input
                                type="email"
                                name="email"
                                required
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Password *</label>
                            <Input
                                type="password"
                                name="password"
                                required
                                minLength={6}
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Phone</label>
                            <Input
                                type="tel"
                                name="phone"
                                placeholder="+1234567890"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Address</label>
                            <Input
                                type="text"
                                name="address"
                                placeholder="123 Main St, City, State"
                            />
                        </div>
                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                            {isLoading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>
                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link href="/login" className="text-primary font-medium hover:underline">
                            Sign in here
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
