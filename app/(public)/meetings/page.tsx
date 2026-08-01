import { Metadata } from 'next';
import type { SacramentMeeting } from '@/lib/types';
import MeetingCard from '@/components/MeetingCard';
import Loading from '@/components/Loading';
import LoadingSmall from '@/components/LoadingSmall';
import { Suspense } from 'react';
import { fetchFilteredMeetings, countMeetings } from '@/app/api/meetings/route';
import { getMeetingsTotalPages, getLastPage } from '@/lib/meetings-db';
import { Pagination } from '@/components/Pagination';
import CreateMeetingBar from '@/components/create/CreateMeetingBar';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Meetings Planner',
};
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

async function getMeetings(searchParamsPromise: PageProps['searchParams']): Promise<[SacramentMeeting[], number]> {
  const searchParams = await searchParamsPromise;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalMeetings] = await Promise.all([
    fetchFilteredMeetings(query, currentPage),
    countMeetings(query),
  ]);

  return [meetings, totalMeetings];
}

export async function FetchedMeetings({ searchParams }: PageProps) {
  const [meetings] = await getMeetings(searchParams);
        // await new Promise(res => setTimeout(res, 50000000));

  if (!meetings.length) {
    return (
      <div className="col-span-full text-center py-12 text-slate-500 font-medium">
        No meetings found.
      </div>
    );
  }

  return (
    <>
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} {...meeting} />
      ))}
    </>
  );
}

async function MeetingLength({ searchParams }: PageProps) {
  const [, totalMeetings] = await getMeetings(searchParams);
  return (
    <div className="flex items-center gap-2 bg-header2 px-4 py-2 rounded-lg border border-subheading/30 shadow-inner">
      <span className="text-callout font-bold text-xl">{totalMeetings}</span>
      <span className="text-white text-sm font-medium uppercase tracking-wider">
        Scheduled
      </span>
    </div>
  );
}

export default async function MeetingsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';
  const rawPage = resolvedSearchParams?.page;
  const current = resolvedSearchParams?.page || 1;
  const suspenseKey = `${query}-${current}`;


  let currentPage: number;
  if (rawPage === undefined || rawPage === '') {
    currentPage = 1;
  } else {
    const parsed = Number(rawPage);
    // Check if it's a valid positive integer (prevents floats like ?page=1.5 or text injections)
    if (!Number.isInteger(parsed) || parsed < 1) {
      notFound();
    }
    currentPage = parsed;
  }

  // Fetch total pages and last page concurrently for performance
  const [totalPages, lastPage] = await Promise.all([
    getMeetingsTotalPages(query),
    getLastPage(),
  ]);

  // If there are results, max page is totalPages. If 0 results, max page is 1.
  const effectiveTotalPages = Math.max(1, totalPages);

  if (currentPage > effectiveTotalPages) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20 flex flex-col">
      {/* 1. Hero / Header Banner */}
      <div className="bg-[#023047] pt-20 pb-24 px-6 border-b-4 border-button-bg shadow-md">
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
              <MeetingLength searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <section className="grow">
        <CreateMeetingBar pageNumber={lastPage} />

        {/* 3. The Meeting Cards List */}
        <div className="flex justify-center items-center">
          <div className="mx-auto px-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mt-8">
            <Suspense
            key={suspenseKey}
              fallback={
                <div className="col-span-full flex justify-center">
                  <Loading />
                </div>
              }>
              <FetchedMeetings searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </section>
      <Pagination totalPages={totalPages} />
    </main>
  );
}