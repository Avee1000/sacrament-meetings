'use client';

import { usePathname } from 'next/navigation';
import HeaderContent from './HeaderContent';
import { Session } from 'next-auth';

interface NavLink {
    href: string;
    label: string;
}

interface NavLinkFilterProps {
    session: Session | null;
    formattedDate: string;
    list: NavLink[];
}

export default function NavLinkFilter({ session, formattedDate, list }: NavLinkFilterProps) {
    const pathname = usePathname();

    const filteredList = list.filter(item => {
        // If the user is not logged in, hide protected pages like "Current" or "Meetings"
        // Also hide /meetings if the user is on the login or signup page
        if (!session && (item.href === "/meetings/current" || (item.href === "/meetings" && (pathname === "/login" || pathname === "/signup")))) {
            return false;
        }
        return true;
    });

    return <HeaderContent session={session} formattedDate={formattedDate} navItems={filteredList} />;
}
