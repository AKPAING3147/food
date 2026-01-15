"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createOrder } from "@/actions/orders"
import { toast } from "sonner"
import { PaymentModal } from "@/components/payment-modal"

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
}

interface CartModalProps {
    isOpen: boolean
    onClose: () => void
    cart: CartItem[]
    updateQuantity: (itemId: string, quantity: number) => void
    removeFromCart: (itemId: string) => void
    total: number
}

export function CartModal({
    isOpen,
    onClose,
    cart,
    updateQuantity,
    removeFromCart,
    total,
}: CartModalProps) {
    const router = useRouter()
    const [isCheckout, setIsCheckout] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isPaymentOpen, setIsPaymentOpen] = useState(false)
    const [formData, setFormData] = useState({
        customerName: "",
        customerPhone: "",
        customerAddress: "",
        notes: "",
    })

    if (!isOpen) return null

    const handleCheckout = () => {
        setIsCheckout(true)
    }

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault()
        // Open payment modal instead of directly creating order
        setIsPaymentOpen(true)
    }

    const handlePaymentSuccess = async () => {
        setIsLoading(true)
        setIsPaymentOpen(false)

        try {
            const orderData = {
                ...formData,
                items: cart.map((item) => ({
                    menuItemId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            }

            const result = await createOrder(orderData)

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Order placed successfully!")
                onClose()
                router.push("/orders")
                router.refresh()
            }
        } catch (error) {
            toast.error("Failed to place order")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">
                                {isCheckout ? "Checkout" : "Your Cart"}
                            </h2>
                            <p className="text-white/80 text-sm">
                                {cart.length} {cart.length === 1 ? "item" : "items"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
                    {!isCheckout ? (
                        <>
                            {cart.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                                    <p className="text-gray-400 text-sm mt-2">Add some delicious items to get started!</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group relative bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        ${item.price.toFixed(2)} each
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                                    title="Remove item"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-l-lg"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-r-lg"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <form onSubmit={handleSubmitOrder} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    required
                                    value={formData.customerName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, customerName: e.target.value })
                                    }
                                    placeholder="John Doe"
                                    className="h-12"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    required
                                    type="tel"
                                    value={formData.customerPhone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, customerPhone: e.target.value })
                                    }
                                    placeholder="+1234567890"
                                    className="h-12"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Delivery Address <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    required
                                    value={formData.customerAddress}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            customerAddress: e.target.value,
                                        })
                                    }
                                    placeholder="123 Main St, City, State"
                                    className="h-12"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Order Notes (Optional)
                                </label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) =>
                                        setFormData({ ...formData, notes: e.target.value })
                                    }
                                    placeholder="Any special instructions..."
                                    rows={3}
                                    className="flex w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                />
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                            <span className="font-semibold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-xl font-bold border-t border-gray-200 dark:border-gray-700 pt-3">
                            <span className="text-gray-900 dark:text-white">Total</span>
                            <span className="text-orange-600 dark:text-orange-400">${total.toFixed(2)}</span>
                        </div>
                        {!isCheckout ? (
                            <Button
                                onClick={handleCheckout}
                                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all"
                            >
                                Proceed to Checkout
                            </Button>
                        ) : (
                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsCheckout(false)}
                                    className="flex-1 h-12 border-2"
                                >
                                    Back to Cart
                                </Button>
                                <Button
                                    onClick={handleSubmitOrder}
                                    disabled={isLoading}
                                    className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all"
                                >
                                    {isLoading ? "Placing Order..." : "Place Order"}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={isPaymentOpen}
                amount={total}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setIsPaymentOpen(false)}
            />
        </div>
    )
}
