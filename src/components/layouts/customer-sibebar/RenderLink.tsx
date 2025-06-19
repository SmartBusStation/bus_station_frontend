"use client";

import {JSX} from "react"
import Link from "next/link";
import {useCustomerSidebar} from "@/lib/hooks/useCustomerSidebar";
import LinkContent from "@/components/layouts/customer-sibebar/LinkContent";
import {LinkItem} from "@/components/layouts/customer-sibebar/clientNavLink";


export type RenderLinkProps = {
    linkItem: LinkItem;
    index?: number;
    isSubLink?: boolean;
    openAction: (isOpen: boolean) => void;
}

export function RenderLink({linkItem, isSubLink, openAction}: RenderLinkProps): JSX.Element
{
    const clientNavBar = useCustomerSidebar(linkItem);
    return (
        <div className="mb-1">
            {clientNavBar.hasSubLinks ? (
                <button className="w-full text-left cursor-pointer" onClick={() => clientNavBar.toggleSubMenu(linkItem.name)}>
                    <LinkContent
                        Icon={clientNavBar.Icon}
                        isActive={clientNavBar.isActive}
                        linkItem={linkItem}
                        isSubLink={!!isSubLink}
                        isExpanded={clientNavBar.isExpanded}
                        hasSubLinks={clientNavBar.hasSubLinks}
                    />
                </button>
            ) : (
                <Link href={linkItem?.link || "#"} onClick={() => openAction(false)} className="block cursor-pointer">
                    <LinkContent
                        Icon={clientNavBar.Icon}
                        isActive={clientNavBar.isActive}
                        linkItem={linkItem}
                        isSubLink={!!isSubLink}
                        isExpanded={clientNavBar.isExpanded}
                        hasSubLinks={false}
                    />
                </Link>
            )}

            {clientNavBar.hasSubLinks && clientNavBar.isExpanded && (
                <div className="mt-2 space-y-1 overflow-hidden animate-slideDown">
                    {linkItem.subLinks?.map((subItem, subIndex) => {
                        return(<RenderLink  key={subIndex} linkItem={subItem} isSubLink={true} openAction={openAction}/>)
                    })}
                </div>
            )}
        </div>
    )
}