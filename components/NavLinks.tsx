'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ProjectSearch } from './SearchBar';
import { useState, useRef, useEffect } from 'react';
import useMediaQuery from './useMediaQuery';
import { is } from 'zod/locales';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


export interface NavItem {
    href: string;
    label: string;
}

interface NavLinksProps {
    navItems: NavItem[];
}


export default function NavLinks({ navItems }: NavLinksProps) {
    // const [isOpen, setIsOpen] = useState(false);
    // const buttonRef = useRef<HTMLButtonElement | null>(null);

    // useEffect(() => {
    //     const element = buttonRef.current;
    //     console.log(element)
    //     if (element) {
    //         const searchButton = element.closest('.searchButton');
    //         console.log(searchButton)
    //         if (searchButton) {
    //             // (searchButton as HTMLElement)

    //         }
    //     }
    // }, [isOpen])

    // const openSearchButton = () => {
    //     setIsOpen(true)
    // }

    // const closeSearchButton = () => {
    //     setIsOpen(false)
    // }
    const pathname = usePathname();
    const isMobile = useMediaQuery('(max-width: 768px)');


    return (
        !isMobile ? (
            <>
                <div className="absolute w-full mx-auto max-w-5xl px-6 z-1 -mt-4 flex justify-self-center">
                    <section className='w-full mx-auto h-14 rounded-xl bg-header2 flex items-center shadow-md/20 text-white max-sm:justify-evenly'>
                        <nav className='flex flex-row sm:justify-between sm:items-center w-[inherit] max-sm:flex-col'>
                            <ul className="flex items-center gap-0">
                                {navItems.map((item) => (
                                    <li key={item.href} className='w-20 text-center ml-2'>
                                        {(() => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <Link
                                                    href={item.href}
                                                    aria-current={isActive ? 'page' : undefined}
                                                    className={`block py-2 my-2 text-sm font-medium transition rounded-md duration-300 ${isActive
                                                        ? 'text-gray-700 bg-white'
                                                        : 'text-gray-100 hover:bg-white hover:text-gray-900'
                                                        }`}
                                                >
                                                    {item.label}
                                                </Link>
                                            );
                                        })()}
                                    </li>
                                ))}
                            </ul>

                            {pathname === '/meetings' && (
                                <ProjectSearch />
                            )}

                        </nav>
                    </section >
                </div>
            </ >
        ) : (
            <div className='absolute m-2 z-1'>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className={`text-black hover:text-black shadow-md/20 bg-white`}>Menu</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                                    {navItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <li key={item.href} className="w-full">
                                                <Link
                                                    href={item.href}
                                                    aria-current={isActive ? 'page' : undefined}
                                                    style={{
                                                        backgroundColor: isActive ? "#e7e7e7" : "transparent",
                                                    }}
                                                    className={`block px-4 py-3.5 w-full text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-brand/20 hover:text-black ${isActive ? 'shadow-sm' : 'text-black/80'
                                                        }`}
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                </div>
        )
    );
}