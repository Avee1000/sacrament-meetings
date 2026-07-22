
import NavLinks from "./NavLinks";

export const list = [
    { href: "/", label: "Home" },
    { href: "/meetings", label: "Meetings" },
    { href: "/meetings/current", label: "Current" },
    { href: "/meetings/create", label: "Create" }
];

export default function Header() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);


    return (
        <header>
            <div id="navigationContainer" className="relative h-auto bg-header text-gray-100 flex justify-between items-center w-full">
                <div className="mx-auto flex w-full items-center justify-between py-1">
                    <div className="flex items-center justify-center p-4 px-8 bg-header">
                        <p className="rounded-md text-2xl font-bold tracking-tight transition-all hover:scale-90 hover:transition-all hover:duration-1000 hover:ease-out">Kasoa</p>
                    </div>

                    <div>
                        <p className="text-lg font-medium text-white pr-4">{formattedDate}</p>
                    </div>
                </div>
            </div>
            <div>
            </div>
            {<NavLinks navItems={list} />}
            {/* <NavLinks /> */}
        </header>
    );
}
