import type { SacramentMeeting } from '@/lib/types';
import MeetingDetail from '@/components/MeetingDetail';

// 1. Update the Promise to return both the meeting (or null) AND the status
async function fetchMeeting(id: string): Promise<{ meeting: SacramentMeeting | null; status: number; error: string | null }> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(new URL(`/api/meetings/${id}`, baseUrl).toString(), {
    cache: 'no-store'
  });

  // 2. If it fails, return null for the meeting, but pass along the error status!
if (!res.ok) {
    // Attempt to parse your API's custom error message, fallback to statusText
    const errorJson = await res.json().catch(() => ({}));
    return {
      meeting: null,
      status: res.status,
      error: errorJson.error || res.statusText // Grabs your custom message!
    };
  }

  const json = await res.json();

  // 3. If it succeeds, return the meeting data and the success status
  return {
    meeting: json.data as SacramentMeeting,
    status: res.status,
    error: null
  };
}

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { meeting, status, error} = await fetchMeeting(id);

if (!meeting) {
    return (
      <main className="min-h-screen bg-slate-50 pb-20">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Error {status}
            </h1>
            {/* Display your exact error message here */}
            <p className="text-lg text-red-600 mb-6 font-medium">
              {error}
            </p>
            <p className="text-sm text-slate-500">
              Please check the URL or go back to the meetings list.
            </p>
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
