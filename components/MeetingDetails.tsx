import MeetingCard from "./MeetingCard";
import { SacramentMeeting } from "@/lib/types";

interface MeetingDetailsProps {
    meetings: SacramentMeeting[];
}

export default function MeetingDetails({ meetings = [] }: MeetingDetailsProps) {
  if (!meetings || meetings.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-slate-200">
        <p className="text-slate-500">No meetings found.</p>
      </div>
    );
  }

  return (
    <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} {...meeting} />
      ))}
    </section>
  );
}