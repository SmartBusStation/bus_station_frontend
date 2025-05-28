import Image, {StaticImageData} from "next/image";
import {ChevronDown, CreditCard, HelpCircle, LogOut, Settings, User} from "lucide-react";
import userIcon from "../../../../public/userIcon.png";
import React from "react";


export interface UserData {
    name: string;
    plan: string;
    avatar: StaticImageData|string;
    email: string
}


export interface ProfileDropdownProps {
    setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isProfileOpen: boolean,
    userData: UserData
}


export default function ProfileDropdown({setIsProfileOpen, isProfileOpen, userData}: ProfileDropdownProps)
{

    async function handleLogout() {
        alert("Logout functionality")
    }

    return (
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
                    <div
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 hidden lg:block"/>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
                <div
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
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
                        <button
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                            <User className="h-4 w-4 text-gray-500"/>
                            <span className="text-sm text-gray-700">My Profile</span>
                        </button>
                        <button
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                            <CreditCard className="h-4 w-4 text-gray-500"/>
                            <span className="text-sm text-gray-700">Billing & Plans</span>
                        </button>
                        <button
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                            <Settings className="h-4 w-4 text-gray-500"/>
                            <span className="text-sm text-gray-700">Settings</span>
                        </button>
                        <button
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                            <HelpCircle className="h-4 w-4 text-gray-500"/>
                            <span className="text-sm text-gray-700">Help & Support</span>
                        </button>
                    </div>

                    <div className="p-2 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-left group"
                        >
                            <LogOut className="h-4 w-4 text-red-500"/>
                            <span className="text-sm text-red-600 group-hover:text-red-700">Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}