import MeetingCard from "./MeetingCard";
import { SacramentMeeting } from "@/lib/types";

interface MeetingDetailsProps {
    meetings: SacramentMeeting[];
}

export default function MeetingDetails({ meetings = [] }: MeetingDetailsProps) {
    return (
        <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {meetings.map((meeting) => (
                <MeetingCard key={meeting.id} {...meeting} />
            ))}
        </section>
    )
}