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
        <section className='w-full h-auto bg-header2 flex items-center text-white max-sm:justify-evenly'>
            <nav className='flex flex-row sm:justify-between sm:items-center w-[inherit] max-sm:flex-col'>
                <ul className="flex items-center gap-0">
                    {navItems.map((item) => (
                        <li key={item.href} className='w-25 text-center'>
                            {(() => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        href={item.href}
                                        aria-current={isActive ? 'page' : undefined}
                                        className={`block px-4 py-4  text-sm font-medium transition duration-300 ${isActive
                                            ? 'text-gray-700 bg-orange-100'
                                            : 'text-gray-100 hover:bg-orange-100 hover:text-gray-900'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })()}
                        </li>
                    ))}
                </ul>
                {/* {pathname !== '/' && !isOpen && (
                    <div className='m-3'>
                        <button onClick={openSearchButton} aria-label="open search" className='cursor-pointer' ref={buttonRef} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-6" fill='white'>
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                            </svg>
                        </button>
                    </div>
                )}
                {pathname !== '/' && isOpen && (
                    <div className='m-3'>
                        <button  onClick={closeSearchButton} aria-label='close search' className='cursor-pointer'>
                            <svg className='size-7' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                )} */}

                {pathname === '/meetings' && (
                    <ProjectSearch />
                )}

            </nav>
        </section >
    );
}