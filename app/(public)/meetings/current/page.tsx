import { SacramentMeeting } from '@/lib/types';
import MeetingDetail from '@/components/MeetingDetail';

async function getMeetings(date: string): Promise<SacramentMeeting[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(new URL(`/api/meetings?date=${date}`, baseUrl).toString(), { cache: 'no-store' });

  if (!res.ok) throw new Error("Failed to fetch meetings");
  const json = await res.json();
  return json.data as SacramentMeeting[];
}


export default async function CurrentMeetingPage() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + (7 - dayOfWeek)); // roll back to Sunday
  const dateString = sunday.toISOString().split('T')[0];

  console.log(dateString  + dayOfWeek +today.getDate())

  const meetings = await getMeetings(dateString);
  console.log(meetings)

  // Assuming there's only one sacrament meeting per Sunday, take the first one
  const currentMeeting = meetings[0];
  console.log(currentMeeting)


  return (
    <main className="min-h-screen bg-slate-50 pb-20 mt-20">
      <div className='flex justify-center'>
        <div className='mx-10 w-[75%] block'>
          <MeetingDetail meeting={currentMeeting} />
        </div>
      </div>
    </main>
  );
}