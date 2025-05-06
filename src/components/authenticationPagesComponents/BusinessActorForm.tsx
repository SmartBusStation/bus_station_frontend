import React, {JSX} from "react";
import {AtSign, Lock, Phone, User} from "lucide-react";
import { BusinessActorFormProps} from "@/lib/type";
import Continue from "@/components/authenticationPagesComponents/Continue";



export default function BusinessActorForm({businessActorData, handleBusinessActorChange, confirmPassword, setConfirmPassword, ...continueProps}: BusinessActorFormProps):JSX.Element
{
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                    <label htmlFor="first_name"
                           className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom
                    </label>
                    <div className="relative">
                        <div
                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400"/>
                        </div>
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            value={businessActorData.first_name || ""}
                            onChange={handleBusinessActorChange}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Jean"
                            required
                        />
                    </div>
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="last_name"
                           className="block text-sm font-medium text-gray-700 mb-2">
                        Nom
                    </label>
                    <div className="relative">
                        <div
                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400"/>
                        </div>
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            value={businessActorData.last_name || ""}
                            onChange={handleBusinessActorChange}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Dupont"
                            required
                        />
                    </div>
                </div>


                <div>
                    <label htmlFor="last_name"
                           className="block text-sm font-medium text-gray-700 mb-2">
                        username
                    </label>
                    <div className="relative">
                        <div
                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400"/>
                        </div>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={businessActorData.username || ""}
                            onChange={handleBusinessActorChange}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Dupont"
                            required
                        />
                    </div>
                </div>


                {/* Email */}
                <div>
                    <label htmlFor="email"
                           className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <div
                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <AtSign className="h-5 w-5 text-gray-400"/>
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={businessActorData.email || ""}
                            onChange={handleBusinessActorChange}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="jean.dupont@example.com"
                            required
                        />
                    </div>
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phone_number"
                           className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de téléphone
                    </label>
                    <div className="relative">
                        <div
                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400"/>
                        </div>
                        <input
                            id="phone_number"
                            name="phone_number"
                            type="tel"
                            value={businessActorData.phone_number || ""}
                            onChange={handleBusinessActorChange}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="+33 6 12 34 56 78"
                            required
                        />
                    </div>
                </div>

                {/* Birth Date
            <div>
                <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date de naissance
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="birth_date"
                        name="birth_date"
                        type="date"
                        value={businessActorData.birth_date || ""}
                        onChange={handleBusinessActorChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
            </div>

            {/* Gender
            <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Genre
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                        id="gender"
                        name="gender"
                        value={businessActorData.gender || "MALE"}
                        onChange={handleBusinessActorChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        required
                    >
                        <option value="MALE">Homme</option>
                        <option value="FEMALE">Femme</option>
                        <option value="OTHER">Autre</option>
                    </select>
                </div>
            </div>

            {/* Nationality
            <div>
                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
                    Nationalité
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Flag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="nationality"
                        name="nationality"
                        type="text"
                        value={businessActorData.nationality || ""}
                        onChange={handleBusinessActorChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Française"
                        required
                    />
                </div>
            </div>

            {/* Profession
            <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
                    Profession
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="profession"
                        name="profession"
                        type="text"
                        value={businessActorData.profession || ""}
                        onChange={handleBusinessActorChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ingénieur"
                    />
                </div>
            </div>*/}

                {/* Password */}
                <div>
                    <label htmlFor="password"
                           className="block text-sm font-medium text-gray-700 mb-2">
                        Mot de passe
                    </label>
                    <div className="relative">
                        <div
                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400"/>
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={businessActorData.phone_number || ""}
                            onChange={handleBusinessActorChange}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                        8 caractères minimum, avec au moins une majuscule et un chiffre
                    </p>
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirmPassword"
                           className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmer le mot de passe
                    </label>
                    <div className="relative">
                        <div
                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400"/>
                        </div>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>
            </div>
            <Continue agreeTerms={continueProps.agreeTerms} step={continueProps.step} goBack={continueProps.goBack} setAgreeTerms={continueProps.setAgreeTerms} createAgency={continueProps.createAgency}/>
        </>
    )
}