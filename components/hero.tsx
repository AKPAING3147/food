"use client"

import { ArrowRight, Star, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative container mx-auto px-4 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 animate-fade-in">
                        {/* Badge */}
                        <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                            <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                            <span>Rated 4.9/5 by 10,000+ customers</span>
                        </div>

                        {/* Heading */}
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                Delicious Food
                                <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                    Delivered Fast
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                                Order from your favorite restaurants and get fresh, hot meals delivered right to your doorstep in minutes.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all group"
                                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Order Now
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-8 text-base font-semibold border-2 hover:bg-orange-50"
                            >
                                View Menu
                            </Button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                            <div className="space-y-2">
                                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-orange-600" />
                                </div>
                                <p className="font-semibold text-gray-900">Fast Delivery</p>
                                <p className="text-sm text-gray-600">30 min or less</p>
                            </div>
                            <div className="space-y-2">
                                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center">
                                    <Truck className="h-6 w-6 text-orange-600" />
                                </div>
                                <p className="font-semibold text-gray-900">Free Shipping</p>
                                <p className="text-sm text-gray-600">On orders $20+</p>
                            </div>
                            <div className="space-y-2">
                                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center">
                                    <Star className="h-6 w-6 text-orange-600" />
                                </div>
                                <p className="font-semibold text-gray-900">Top Quality</p>
                                <p className="text-sm text-gray-600">Fresh ingredients</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Image */}
                    <div className="relative lg:h-[600px] animate-fade-in animation-delay-200">
                        <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
                            {/* Placeholder for food image - you can replace with actual image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                                <div className="text-center text-white space-y-4">
                                    <div className="text-9xl">🍔</div>
                                    <p className="text-2xl font-bold">Your Delicious Food</p>
                                    <p className="text-white/80">Awaits You!</p>
                                </div>
                            </div>
                            {/* Floating Cards */}
                            <div className="absolute top-8 right-8 bg-white rounded-2xl p-4 shadow-xl animate-float">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <span className="text-2xl">✅</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Order Confirmed</p>
                                        <p className="text-sm text-gray-600">Preparing your meal...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-8 left-8 bg-white rounded-2xl p-4 shadow-xl animate-float animation-delay-1000">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-orange-100 p-2 rounded-lg">
                                        <span className="text-2xl">🚚</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">On the way!</p>
                                        <p className="text-sm text-gray-600">Arrives in 15 min</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
