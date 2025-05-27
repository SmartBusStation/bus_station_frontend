import {usePathname} from "next/navigation";
import {useState} from "react";
import {LinkItem} from "@/components/layouts/customer-sibebar/CustomerSidebar";

export function useClientNavBar(linkItem: LinkItem)
{

    const activeLink = usePathname();
    const [expandedLinks, setExpandedLinks] = useState<Record<string, boolean>>({});
    const isActive = isLinkActive(linkItem?.link);
    const hasSubLinks = linkItem?.subLinks && linkItem?.subLinks.length > 0;
    const isExpanded = expandedLinks[linkItem?.name];
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
    }

}