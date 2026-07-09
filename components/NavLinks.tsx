
'use client';

import { COMPILER_INDEXES } from 'next/dist/shared/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
    href: string;
    label: string;
}

interface NavLinksProps {
    navItems: NavItem[];
}


export default function NavLinks({navItems}: NavLinksProps) {

    const pathname = usePathname();
    console.log(pathname);
    
    return (
        <section className='w-full h-auto bg-header2 flex items-center text-white max-sm:justify-evenly'>
            <nav>
                <ul className="flex items-center gap-0">
                    {navItems.map((item) => (
                        <li key={item.href} className='w-25 text-center'>
                            {(() => {
                                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                                return (
                                    <Link
                                        href={item.href}
                                        aria-current={isActive ? 'page' : undefined}
                                        className={`block px-4 py-4  text-sm font-medium transition duration-300 ${
                                            isActive
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
            </nav>
        </section>
    );
}
