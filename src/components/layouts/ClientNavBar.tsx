import { useState } from "react";
import { Settings, Mail, LogOut, Menu, Bell, Search, ChevronDown, User, CreditCard, HelpCircle } from "lucide-react";
import Image from "next/image";
import userIcon from "../../../public/userIcon.png";

export interface ModernNavBarProps {
    onMenuClick: () => void
}

export default function ModernNavBar({ onMenuClick }: ModernNavBarProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)

    // Données utilisateur mockées
    const userData = {
        name: "John Traveler",
        email: "john@mooving.com",
        avatar: userIcon,
        plan: "Premium Member",
    }

    const notifications = [
        { id: 1, title: "Trip Confirmed", message: "Your trip to Yaoundé is confirmed", time: "2 min ago", unread: true },
        { id: 2, title: "New Offer", message: "20% off on weekend trips", time: "1 hour ago", unread: true },
        {
            id: 3,
            title: "Payment Received",
            message: "Payment for trip #1234 received",
            time: "3 hours ago",
            unread: false,
        },
    ]

    const unreadCount = notifications.filter((n) => n.unread).length

    function handleLogout() {
        alert("Logout functionality")
    }

    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-4 lg:px-6 py-2">
                <div className="flex justify-between items-center">
                    {/* Left Section */}
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            onClick={onMenuClick}
                        >
                            <Menu className="h-5 w-5 text-gray-600" />
                        </button>

                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                                Welcome back,{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    {userData.name.split(" ")[0]}
                                </span>
                                !
                            </h1>
                            <p className="text-sm text-gray-500 hidden lg:block">Ready for your next adventure?</p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        {/* Action Buttons */}
                        <div className="hidden lg:flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group">
                                <Settings className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                            </button>

                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group">
                                <Mail className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                            </button>
                        </div>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group relative"
                            >
                                <Bell className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotificationOpen && (
                                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                                    <div className="p-4 border-b border-gray-100">
                                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                                        <p className="text-sm text-gray-500">{unreadCount} new notifications</p>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${notification.unread ? "bg-blue-50" : ""}`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                                                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                                                    </div>
                                                    {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 border-t border-gray-100">
                                        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                                            View all notifications
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            >
                                <div className="hidden lg:block text-right">
                                    <p className="font-semibold text-gray-900 text-sm">{userData.name}</p>
                                    <p className="text-xs text-gray-500">{userData.plan}</p>
                                </div>
                                <div className="relative">
                                    <Image
                                        src={userData.avatar}
                                        alt="Profile"
                                        width={40}
                                        height={40}
                                        className="rounded-full border-2 border-gray-200"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <ChevronDown className="h-4 w-4 text-gray-400 hidden lg:block" />
                            </button>

                            {/* Profile Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                                    <div className="p-4 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={userIcon}
                                                alt="Profile"
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{userData.name}</h3>
                                                <p className="text-sm text-gray-500">{userData.email}</p>
                                                <span className="inline-block px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full mt-1">
                          {userData.plan}
                        </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-2">
                                        <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                                            <User className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">My Profile</span>
                                        </button>
                                        <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                                            <CreditCard className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">Billing & Plans</span>
                                        </button>
                                        <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                                            <Settings className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">Settings</span>
                                        </button>
                                        <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                                            <HelpCircle className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">Help & Support</span>
                                        </button>
                                    </div>

                                    <div className="p-2 border-t border-gray-100">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-left group"
                                        >
                                            <LogOut className="h-4 w-4 text-red-500" />
                                            <span className="text-sm text-red-600 group-hover:text-red-700">Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="xl:hidden px-4 pb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search trips..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm"
                    />
                </div>
            </div>

            {/* Click outside to close dropdowns */}
            {(isProfileOpen || isNotificationOpen) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setIsProfileOpen(false)
                        setIsNotificationOpen(false)
                    }}
                />
            )}
        </div>
    )
}
