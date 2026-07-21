import type { SacramentMeeting } from '@/lib/types';
import MeetingCard from '@/components/MeetingCard';
import Loading from '@/components/Loading';
import LoadingSmall from '@/components/LoadingSmall';
import { Suspense } from 'react';
import { fetchFilteredMeetings, countMeetings } from '@/app/api/meetings/route';
import { getMeetingsTotalPages } from '@/lib/meetings-db';
import { Pagination } from '@/components/Pagination';

export const dynamic = 'force-dynamic';

async function getMeetings(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}): Promise<[SacramentMeeting[], number]> {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const meetings = await fetchFilteredMeetings(query, currentPage);
  const totalMeetings = await countMeetings(query);

  return [meetings, totalMeetings];
}

async function FetchedMeetings(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const [meetings] = await getMeetings(props);
  return (
    meetings.map((meeting) => (
      <MeetingCard key={meeting.id} {...meeting} />
    ))
  );
}

async function MeetingLength(props: {
  searchParams?: Promise<{ query?: string}>;
}) {
  const [, totalMeetings] = await getMeetings(props);
  return (
    <div className="flex items-center gap-2 bg-header2 px-4 py-2 rounded-lg border border-subheading/30 shadow-inner">
      <span className="text-callout font-bold text-xl">{totalMeetings}</span>
      <span className="text-white text-sm font-medium uppercase tracking-wider">
        Scheduled
      </span>
    </div>
  );
}



export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const totalPages = await getMeetingsTotalPages(query);

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
            <Suspense fallback={<LoadingSmall />}>
              <MeetingLength searchParams={props.searchParams} />
            </Suspense>

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
        <div className="flex justify-center items-center">
          <div className="mx-auto px-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={
              // Add a wrapper here with col-span-full
              <div className="col-span-full flex justify-center">
                <Loading />
              </div>
            }>
              <FetchedMeetings searchParams={props.searchParams} />
            </Suspense>
          </div>
        </div>
      </section>
      <Pagination totalPages={totalPages} />
    </main>
  );
}
