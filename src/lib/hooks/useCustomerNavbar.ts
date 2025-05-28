import {useState} from "react";
import {UserData} from "@/components/layouts/customer-navbar/ProfileDropdown";
import userIcon from "../../../public/userIcon.png";

export function useCustomerNavbar()
{

    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)

    // Données utilisateur mockées
    const userData: UserData = {
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





    return {
        unreadCount,
        userData,
        notifications,
        isNotificationOpen,
        setIsNotificationOpen,
        isProfileOpen,
        setIsProfileOpen
    }
}