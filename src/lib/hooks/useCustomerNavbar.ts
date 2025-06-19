import {useState} from "react";
import {useBusStation} from "@/context/Provider";
import {Customer} from "@/lib/types/models/BusinessActor";

export function useCustomerNavbar()
{

    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
    const {userData} = useBusStation();

    const visitorUserData : Customer= {
        userId:"userId",
        first_name: "Visitor",
        last_name:"",
        email:"",
        role:["USAGER"],
        phone_number:"",
        username:"Visitor"
    }

    // Données utilisateur mockées
    /*const userData: UserData = {
        name: "John Traveler",
        email: "john@mooving.com",
        avatar: userIcon,
        plan: "Premium Member",
    }*/

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
        setIsProfileOpen,
        visitorUserData
    }
}