import { Settings, Mail, Menu } from "lucide-react";
import NotificationSection from "@/components/layouts/customer-navbar/NotificationSection";
import ProfileDropdown from "@/components/layouts/customer-navbar/ProfileDropdown";
import {useCustomerNavbar} from "@/lib/hooks/useCustomerNavbar";


export interface ModernNavBarProps {
    onMenuClick: () => void
}

export default function CustomerNavBar({ onMenuClick }: ModernNavBarProps) {

    const customerNavBar = useCustomerNavbar();

    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-4 lg:px-6 py-2 mt-1">
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
                                    {customerNavBar.userData ? (customerNavBar.userData.first_name + " " + customerNavBar.userData.last_name) : customerNavBar?.visitorUserData?.username}
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
                        <NotificationSection
                            notifications={customerNavBar.notifications}
                            unreadCount={customerNavBar.unreadCount}
                            isNotificationOpen={customerNavBar.isNotificationOpen}
                            setIsNotificationOpen={customerNavBar.setIsNotificationOpen}
                        />

                        {/* Profile Dropdown */}
                        <ProfileDropdown
                            setIsProfileOpen={customerNavBar.setIsProfileOpen}
                            isProfileOpen={customerNavBar.isProfileOpen}
                            userData={customerNavBar.userData ||customerNavBar.visitorUserData}
                        />
                    </div>
                </div>
            </div>


            {/* Click outside to close dropdowns */}
            {(customerNavBar.isProfileOpen || customerNavBar.isNotificationOpen) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        customerNavBar.setIsProfileOpen(false)
                        customerNavBar.setIsNotificationOpen(false)
                    }}
                />
            )}
        </div>
    )
}
