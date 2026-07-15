// app/projects/layout.tsx

import NavLinks from '@/components/NavLinks';

export const list = [
  { href: "/", label: "Home" },
  { href: "/meetings/current", label: "Current" },
  { href: "/meetings", label: "Meetings" },
  { href: "/meetings/1", label: "Review" }
];

export default function MeetingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='flex-row flex bg-header2'>
        <NavLinks navItems={list} />
        <div className="search-icon flex justify-center items-center rounded-full w-auto h-auto hover:cursor-pointer mr-5">
          <button aria-label="button" className='hover:cursor-pointer' >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-6" fill='white'>
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
            </svg>
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}