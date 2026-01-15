"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ShoppingCart } from "lucide-react"
import { CartModal } from "./cart-modal"

interface MenuItem {
    id: string
    name: string
    description: string | null
    price: number
    image: string | null
    available: boolean
    category: {
        id: string
        name: string
    }
}

interface Category {
    id: string
    name: string
    description: string | null
    _count: {
        menuItems: number
    }
}

interface MenuGridProps {
    categories: Category[]
    menuItems: MenuItem[]
}

interface CartItem extends MenuItem {
    quantity: number
}

export function MenuGrid({ categories, menuItems }: MenuGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [cart, setCart] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const filteredItems = selectedCategory
        ? menuItems.filter((item) => item.categoryId === selectedCategory && item.available)
        : menuItems.filter((item) => item.available)

    const addToCart = (item: MenuItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id)
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (itemId: string) => {
        setCart((prev) => prev.filter((i) => i.id !== itemId))
    }

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity === 0) {
            removeFromCart(itemId)
            return
        }
        setCart((prev) =>
            prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
        )
    }

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <>
            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap gap-3 justify-center animate-slide-up">
                <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    onClick={() => setSelectedCategory(null)}
                    className="rounded-full"
                >
                    All Items
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category.id)}
                        className="rounded-full"
                    >
                        {category.name} ({category._count.menuItems})
                    </Button>
                ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {filteredItems.map((item, index) => (
                    <Card
                        key={item.id}
                        className="overflow-hidden hover:scale-105 transition-transform duration-300 animate-scale-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200">
                            {item.image ? (
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-6xl">
                                    🍽️
                                </div>
                            )}
                        </div>
                        <CardHeader>
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <CardDescription className="line-clamp-2">
                                {item.description || "Delicious food item"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-primary">
                                    ${item.price.toFixed(2)}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {item.category.name}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                onClick={() => addToCart(item)}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">
                        No items available in this category
                    </p>
                </div>
            )}

            {/* Floating Cart Button */}
            {cartItemCount > 0 && (
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-8 right-8 gradient-primary text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform z-40 animate-scale-in"
                >
                    <div className="relative">
                        <ShoppingCart className="h-6 w-6" />
                        <span className="absolute -top-2 -right-2 bg-white text-orange-500 rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
                            {cartItemCount}
                        </span>
                    </div>
                </button>
            )}

            {/* Cart Modal */}
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                total={cartTotal}
            />
        </>
    )
}
