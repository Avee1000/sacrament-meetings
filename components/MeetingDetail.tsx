import MeetingCard from "./MeetingCard";
import { SacramentMeeting as s } from "@/lib/types";

interface Sacrament {
    m: s[];
}

export default function MeetingDetails({ m }: Sacrament) {
    return (
        <section className="grid gap-4 md:grid-cols-2">
            {m.map((meetings) => (
                <MeetingCard key={meetings.id} {...meetings} />
            ))}
        </section>
    )
}