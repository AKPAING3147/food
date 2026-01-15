"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 rounded-lg flex items-center justify-center overflow-hidden">
                                <img
                                    src="/images/icon.png"
                                    alt="FoodieGo Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                                FoodieGo
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Delivering happiness to your doorstep. Fresh, delicious food made with love and delivered with care.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="bg-white/10 hover:bg-orange-500 p-2 rounded-lg transition-all hover:scale-110">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="bg-white/10 hover:bg-orange-500 p-2 rounded-lg transition-all hover:scale-110">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="bg-white/10 hover:bg-orange-500 p-2 rounded-lg transition-all hover:scale-110">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                                    My Orders
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-orange-400">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                                    FAQs
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-orange-400">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3 text-sm">
                                <MapPin className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400">123 Food Street, Tasty City, TC 12345</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm">
                                <Phone className="h-5 w-5 text-orange-400 flex-shrink-0" />
                                <span className="text-gray-400">+1 (234) 567-8900</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm">
                                <Mail className="h-5 w-5 text-orange-400 flex-shrink-0" />
                                <span className="text-gray-400">hello@foodiego.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} FoodieGo. All rights reserved.
                        </p>
                        <p className="text-gray-400 text-sm">
                            Made with ❤️ for food lovers
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
