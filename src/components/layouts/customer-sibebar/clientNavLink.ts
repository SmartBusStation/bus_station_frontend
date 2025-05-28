import {FaBus, FaHistory, FaHome, FaTicketAlt} from "react-icons/fa";
import {BsFillCalendarCheckFill, BsFillCalendarXFill} from "react-icons/bs";
import React from "react";


export interface LinkItem
{
    name: string
    link?: string
    icon: React.ElementType
    subLinks?: LinkItem[]
    badge?: string
    description?: string
}


export const linkList = [

    {
        name: "Market Place",
        link: "/market-place",
        icon: FaHome,
    },
    {
        name: "Scheduled Trips",
        link: "/scheduled-trips",
        icon: FaBus,
    },
    {
        name: "Coupons",
        link: "/coupons",
        icon: FaTicketAlt,
    },
    /* {
         name: "Statistics",
         link: "/statistics",
         icon: AiOutlineBarChart,
     },*/
    {
        name: "History",
        icon: FaHistory,
        subLinks: [
            {
                icon: BsFillCalendarCheckFill,
                name: "Reservation",
                link: '/history/reservation',

            },
            {
                icon: BsFillCalendarXFill,
                name: "Cancellation",
                link: '/history/cancellation',
            }
        ]
    },
];
