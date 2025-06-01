"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  User,
  Phone,
  CalendarIcon,
  Shield,
  Upload,
  X,
  Check,
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    username: "JohnDoe",
    phoneNumber: "+33 6 12 34 56 78",
    email: "john.doe@example.com",
    memberSince: "01/01/2023",
    bio: "Passionate traveler exploring the world one destination at a time."
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous pourriez envoyer les données à votre API
    console.log("Données soumises:", { ...formData, profileImage })
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setIsEditing(false)
    // Réinitialiser les modifications non sauvegardées si nécessaire
  }
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Profil Utilisateur</h1>
      
      <div className="flex justify-center">
        <Card className="w-full max-w-4xl shadow-xl">
          <CardHeader className="pb-8 pt-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 bg-blue-600">
                  <AvatarImage src={profileImage || "/placeholder.svg?height=96&width=96"} alt="Profile" />
                  <AvatarFallback className="bg-blue-600 text-white text-3xl font-bold">J</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-2xl font-semibold">Informations Personnelles</CardTitle>
              </div>
            </div>
          </CardHeader>

                <CardContent className="space-y-8 px-8 py-6">
                  {!isEditing ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Username */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">Username</label>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold text-gray-900">{formData.username}</span>
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">Phone Number</label>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold text-gray-900">{formData.phoneNumber}</span>
                          </div>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">Email Address</label>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold text-gray-900">{formData.email}</span>
                          </div>
                        </div>

                        {/* Member Since */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">Member Since</label>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold text-gray-900">{formData.memberSince}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bio section */}
                      <div className="space-y-3 border-t pt-6 mt-2">
                        <label className="text-base font-medium text-gray-700">Bio</label>
                        <p className="text-gray-700 text-lg leading-relaxed">{formData.bio}</p>
                      </div>

                      <div className="pt-6">
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base"
                          onClick={() => setIsEditing(true)}
                        >
                          Modifier le profil
                        </Button>
                      </div>
                    </>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="flex justify-center mb-8">
                        <div className="relative">
                          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                            <AvatarImage src={profileImage || "/placeholder.svg?height=96&width=96"} alt="Profile" />
                            <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">J</AvatarFallback>
                          </Avatar>
                          
                          <Label 
                            htmlFor="profile-image" 
                            className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                          </Label>
                          <Input 
                            id="profile-image" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageUpload} 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Username */}
                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-base font-medium text-gray-700">Username</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <User className="w-4 h-4 text-gray-500" />
                            </div>
                            <Input 
                              id="username" 
                              name="username" 
                              value={formData.username} 
                              onChange={handleInputChange} 
                              className="pl-10" 
                            />
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-600">Phone Number</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <Phone className="w-4 h-4 text-gray-500" />
                            </div>
                            <Input 
                              id="phoneNumber" 
                              name="phoneNumber" 
                              value={formData.phoneNumber} 
                              onChange={handleInputChange} 
                              className="pl-10" 
                            />
                          </div>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-600">Email Address</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <Mail className="w-4 h-4 text-gray-500" />
                            </div>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              value={formData.email} 
                              onChange={handleInputChange} 
                              className="pl-10" 
                            />
                          </div>
                        </div>

                        {/* Member Since - Read Only */}
                        <div className="space-y-2">
                          <Label htmlFor="memberSince" className="text-sm font-medium text-gray-600">Member Since</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <CalendarIcon className="w-4 h-4 text-gray-500" />
                            </div>
                            <Input 
                              id="memberSince" 
                              name="memberSince" 
                              value={formData.memberSince} 
                              readOnly 
                              className="pl-10 bg-gray-50" 
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-base font-medium text-gray-700">Bio</Label>
                        <Textarea 
                          id="bio" 
                          name="bio" 
                          value={formData.bio} 
                          onChange={handleInputChange} 
                          rows={4} 
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <div className="flex gap-4 pt-6">
                        <Button 
                          type="submit" 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base flex items-center gap-2"
                        >
                          <Check className="w-5 h-5" /> Enregistrer
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={cancelEdit} 
                          className="px-8 py-3 text-base flex items-center gap-2"
                        >
                          <X className="w-5 h-5" /> Annuler
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
  )
}
