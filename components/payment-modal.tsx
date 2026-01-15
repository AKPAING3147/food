"use client"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutFormProps {
    amount: number
    onSuccess: () => void
    onCancel: () => void
}

function CheckoutForm({ amount, onSuccess, onCancel }: CheckoutFormProps) {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsLoading(true)

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/orders?payment=success`,
                },
                redirect: "if_required",
            })

            if (error) {
                toast.error(error.message || "Payment failed")
            } else {
                toast.success("Payment successful!")
                onSuccess()
            }
        } catch (error) {
            toast.error("Payment failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        ${amount.toFixed(2)}
                    </span>
                </div>
            </div>

            <PaymentElement />

            <div className="flex gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="flex-1"
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={!stripe || isLoading}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                    {isLoading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
                </Button>
            </div>
        </form>
    )
}

interface PaymentModalProps {
    isOpen: boolean
    amount: number
    onSuccess: () => void
    onCancel: () => void
}

export function PaymentModal({ isOpen, amount, onSuccess, onCancel }: PaymentModalProps) {
    const [clientSecret, setClientSecret] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isDemoMode, setIsDemoMode] = useState(false)

    useEffect(() => {
        if (isOpen && amount > 0) {
            // Create PaymentIntent as soon as the modal opens
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.demo) {
                        setIsDemoMode(true)
                        setClientSecret("demo")
                    } else if (data.clientSecret) {
                        setClientSecret(data.clientSecret)
                    } else {
                        toast.error("Failed to initialize payment")
                    }
                })
                .catch(() => {
                    toast.error("Failed to initialize payment")
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [isOpen, amount])

    const handleDemoPayment = () => {
        toast.success("Demo payment successful!")
        onSuccess()
    }

    if (!isOpen) return null

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe' as const,
            variables: {
                colorPrimary: '#ea580c',
            },
        },
    }

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onCancel}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Complete Payment
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Enter your payment details to complete your order
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                    </div>
                ) : isDemoMode ? (
                    <div className="space-y-6">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
                            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                                <strong>Demo Mode:</strong> Stripe is not configured. This is a test order without payment processing.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                    ${amount.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDemoPayment}
                                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                            >
                                Place Order (Demo)
                            </Button>
                        </div>
                    </div>
                ) : clientSecret ? (
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm amount={amount} onSuccess={onSuccess} onCancel={onCancel} />
                    </Elements>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-red-600">Failed to load payment form</p>
                        <Button onClick={onCancel} variant="outline" className="mt-4">
                            Close
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
