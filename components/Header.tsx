import { auth } from '@/auth';
import HeaderContent from './HeaderContent';

export const list = [
    { href: "/", label: "Home" },
    { href: "/meetings", label: "Meetings" },
    { href: "/meetings/current", label: "Current" }
];

export default async function Header() {
    const session = await auth();
    
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    return <HeaderContent session={session} formattedDate={formattedDate} navItems={list} />;
}