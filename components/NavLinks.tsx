'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ProjectSearch } from './SearchBar';
import { useState, useRef, useEffect } from 'react';

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

    return (
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

    );
}