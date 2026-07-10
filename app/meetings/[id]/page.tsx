import type { SacramentMeeting } from '@/lib/types';
import MeetingDetail from '@/components/MeetingDetail';

async function fetchMeeting(id: string): Promise<SacramentMeeting | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  
  const res = await fetch(new URL(`/api/meetings/${id}`, baseUrl).toString(), { 
    cache: 'no-store' 
  });

  if (!res.ok) {
    return null;
  }

  // Because the API now returns the meeting directly, this works perfectly:
  const json = await res.json()
  return json.data as SacramentMeeting;
}

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = await fetchMeeting(id);

  if (!meeting) {
    return (
      <main className="min-h-screen bg-slate-50 pb-20">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Meeting not found</h1>
            <p className="text-sm text-slate-600 mb-6">No meeting exists with ID <strong>{id}</strong>.</p>
            <p className="text-sm text-slate-500">Please check the URL or go back to the meetings list.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <MeetingDetail meeting={meeting} />
      </div>
    </main>
  );
}