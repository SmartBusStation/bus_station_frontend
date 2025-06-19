import {usePathname} from "next/navigation";
import {useState} from "react";
import {LinkItem} from "@/components/layouts/customer-sibebar/clientNavLink";


export function useCustomerSidebar(linkItem?: LinkItem)
{

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);



    const activeLink = usePathname();
    const [expandedLinks, setExpandedLinks] = useState<Record<string, boolean>>({});
    const isActive = isLinkActive(linkItem?.link);
    const hasSubLinks = linkItem?.subLinks && linkItem?.subLinks.length > 0;
    const linkItemName = linkItem?.name || "";
    const isExpanded = expandedLinks[linkItemName];
    const Icon = linkItem?.icon;


    function toggleSubMenu(linkName: string): void
    {
        setExpandedLinks((prev) => ({
            ...prev,
            [linkName]: !prev[linkName],
        }));
    }

    function isLinkActive(link?: string): boolean
    {
        if (!link) return false;
        return activeLink === link || activeLink.startsWith(link + "/");
    }


    return {
        isActive,
        hasSubLinks,
        isExpanded,
        Icon,
        toggleSubMenu,
        isSidebarOpen,
        setIsSidebarOpen
    }

}