import {Building2, Check, ChevronDown, User} from "lucide-react";
import React, {JSX} from "react";
import {UserTypeComponentPropsType} from "@/lib/type";


export default function UserType({userType, isDropdownOpen, selectUserType, toggleDropdown}: UserTypeComponentPropsType): JSX.Element
{

    return(
        <>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de compte</label>
                <div className="relative">
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-between hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        <div className="flex items-center">
                            {userType === "client" ? (
                                <User className="h-5 w-5 text-blue-600 mr-2"/>
                            ) : (
                                <Building2 className="h-5 w-5 text-blue-600 mr-2"/>
                            )}
                            <span>{userType === "client" ? "Voyageur" : "Agence de voyage"}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-gray-500"/>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                            <button
                                type="button"
                                className={`w-full px-4 py-3 flex items-center hover:bg-blue-50 ${
                                    userType === "client" ? "bg-blue-50" : ""
                                }`}
                                onClick={() => selectUserType("client")}
                            >
                                <User className="h-5 w-5 text-blue-600 mr-2"/>
                                <span>Voyageur</span>
                                {userType === "client" && <Check className="h-4 w-4 text-blue-600 ml-auto"/>}
                            </button>
                            <button
                                type="button"
                                className={`w-full px-4 py-3 flex items-center hover:bg-blue-50 ${
                                    userType === "agency" ? "bg-blue-50" : ""
                                }`}
                                onClick={() => selectUserType("agency")}
                            >
                                <Building2 className="h-5 w-5 text-blue-600 mr-2"/>
                                <span>Agence de voyage</span>
                                {userType === "agency" && <Check className="h-4 w-4 text-blue-600 ml-auto"/>}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}