import MeetingDetails from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';

async function getMeetings(): Promise<SacramentMeeting[]> {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek); // roll back to Sunday
    console.log(sunday.toISOString);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const res = await fetch(new URL(`api/meetings?date=${sunday.toISOString().split('T')[0]}`, baseUrl).toString(), { cache: 'no-store' });

    if (!res.ok) throw new Error("Failed to fetch meetings");
    const json = await res.json();
    return json.data as SacramentMeeting[];
}

export default async function MeetingsPage() {
    const meetings = await getMeetings();

    return (
        <main className="min-h-screen bg-slate-50 pb-20 mt-20">
            <div className='flex justify-center'>
                <div className='mx-10'>
                    <MeetingDetails meetings={meetings} />
                </div>
            </div>
        </main>
    );
}