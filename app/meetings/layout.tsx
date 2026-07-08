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
        <NavLinks navItems={list}/>
        {children}
    </div>
  );
}