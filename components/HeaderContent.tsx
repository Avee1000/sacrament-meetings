// components/HeaderContent.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from 'next/link';
import UserMenu from './UserMenu';
import NavLinks from "./NavLinks";
import { Session } from "next-auth";

interface NavItem {
    href: string;
    label: string;
}

interface HeaderContentProps {
    session: Session | null;
    formattedDate: string;
    navItems: NavItem[];
}

export default function HeaderContent({ session, formattedDate, navItems }: HeaderContentProps) {
    const pathname = usePathname();
    const isAuthRoute = pathname?.startsWith('/login') || pathname?.startsWith('/signup');
    const showAuthLinks = !session && !isAuthRoute;

    return (
        <header>
            <div id="navigationContainer" className="relative h-auto bg-header text-gray-100 flex justify-between items-center w-full">
                <div className="mx-auto flex w-full items-center justify-between py-1">
                    <div className="flex items-center justify-center p-4 px-8 bg-header">
                        <p className="rounded-md text-2xl font-bold tracking-tight">Kasoa</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <p className="text-lg font-medium text-white pr-4 hidden md:block">{formattedDate}</p>
                        {showAuthLinks && (
                            <div className="flex items-center gap-2">
                                <Link href="/signup" className="hidden sm:inline-flex bg-white text-black py-1.5 px-4 rounded-full text-sm font-semibold border-2 border-white hover:bg-gray-100 transition-colors">
                                    Sign Up
                                </Link>
                                <Link href="/login" className="hidden sm:inline-flex py-1.5 px-4 rounded-full text-sm font-semibold border-2 border-white hover:bg-white hover:text-gray-900 transition-colors">
                                    Log In
                                </Link>
                            </div>
                        )}
                        {session && <UserMenu session={session}/>}
                    </div>
                </div>
            </div>
            <NavLinks navItems={navItems} />
        </header>
    );
}
// components/HeaderContent.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from 'next/link';
import UserMenu from './UserMenu';
import NavLinks from "./NavLinks";
import { Session } from "next-auth";

interface NavItem {
    href: string;
    label: string;
}

interface HeaderContentProps {
    session: Session | null;
    formattedDate: string;
    navItems: NavItem[];
}

export default function HeaderContent({ session, formattedDate, navItems }: HeaderContentProps) {
    const pathname = usePathname();
    const isAuthRoute = pathname?.startsWith('/login') || pathname?.startsWith('/signup');
    const showAuthLinks = !session && !isAuthRoute;

    return (
        <header className="relative">
            <div id="navigationContainer" className="relative h-auto bg-header text-gray-100 flex justify-between items-center w-full pb-5 pt-2 border-b border-gray-500">
                <div className="mx-auto flex w-full items-center justify-between py-1">
                    <div className="flex items-center justify-center p-4 px-8 bg-header">
                        <p className="rounded-md text-2xl font-bold tracking-tight">Kasoa</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <p className="text-lg font-medium text-white pr-4 hidden md:block">{formattedDate}</p>
                        {showAuthLinks && (
                            <div className="flex items-center gap-2 mr-2">
                                <Link href="/signup" className="hidden sm:inline-flex bg-white text-black py-1.5 px-4 rounded-full text-sm font-semibold border-2 border-white hover:bg-gray-100 transition-colors">
                                    Sign Up
                                </Link>
                                <Link href="/login" className="hidden sm:inline-flex py-1.5 px-4 rounded-full text-sm font-semibold border-2 border-white hover:bg-white hover:text-gray-900 transition-colors">
                                    Log In
                                </Link>
                            </div>
                        )}
                        {session && <UserMenu session={session}/>}
                    </div>
                </div>
            </div>
            <NavLinks navItems={navItems} />
        </header>
    );
}