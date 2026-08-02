'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className='flex flex-row justify-center'>
      <nav aria-label="Pagination" className='mt-10 flex flex-row gap-5 items-center'>
        {currentPage > 1 && (
          <Link href={createPageURL(currentPage - 1)} className="p-2 rounded-full bg-red-500 hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
        )}
        <span>Page {currentPage} of {totalPages}</span>
        {currentPage < totalPages && (
          <Link href={createPageURL(currentPage + 1)} className="p-2 rounded-full bg-red-500 hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        )}
      </nav>
    </div>
  );
}