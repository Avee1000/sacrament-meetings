import { auth } from '@/auth';
import NavLinkFilter from './NavLinkFilter'; // Import the new component

export const list = [
    { href: "/", label: "Home" },
    { href: "/meetings", label: "Meetings" },
    { href: "/meetings/current", label: "Current" }
];

export default async function Header() {
    const session = await auth();

    console.log("[Session Header]", JSON.stringify(session, null, 2));

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    return <NavLinkFilter session={session} formattedDate={formattedDate} list={list} />;
}