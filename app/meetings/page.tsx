import type { SacramentMeeting } from '@/lib/types';
import MeetingCard from '@/components/MeetingCard';

export const dynamic = 'force-dynamic';

async function getMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(new URL('/api/meetings', baseUrl).toString(), { cache: 'no-store' });

  if (!res.ok) throw new Error("Failed to fetch meetings");
  const json = await res.json();
  return json.data as SacramentMeeting[];
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* 1. Hero / Header Banner */}
      <div className="bg-[#023047] pt-16 pb-24 px-6 border-b-4 border-button-bg shadow-md">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

            {/* Header Text */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                Sacrament Meetings
              </h1>
              <p className="text-background text-lg leading-relaxed">
                Review upcoming agendas, track presiding authorities, and prepare for Sunday services all in one place.
              </p>
            </div>

            {/* Quick Stats / Info Badge */}
            <div className="flex items-center gap-2 bg-header2 px-4 py-2 rounded-lg border border-subheading/30 shadow-inner">
              <span className="text-callout font-bold text-xl">{meetings.length}</span>
              <span className="text-white text-sm font-medium uppercase tracking-wider">
                Scheduled
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main Content Area (Overlapping the header) */}
      <section>
        <div className="mx-auto max-w-6xl px-6 -mt-10 relative z-10">
          {/* Action / Toolbar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 font-medium text-sm">
              Displaying all upcoming meetings
            </p>

            <button className="bg-subheading hover:bg-header2 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm flex items-center gap-2 hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Schedule Meeting
            </button>
          </div>
        </div>

        {/* 3. The Meeting Cards List (one MeetingCard per fetched meeting) */}
        <div className="flex justify-center">
          <div className="mx-auto max-w-6xl px-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} {...meeting} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
