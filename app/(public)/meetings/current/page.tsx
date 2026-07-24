import MeetingDetail from '@/components/MeetingDetail';

import { getMeetings } from '@/lib/meetings-db';

async function getCurrentMeeting(date: string) {
  const meetings = await getMeetings(date);
  if (!meetings || meetings.length === 0) {
    throw new Error('Meeting not found');
  }
  return meetings[0];
}


export default async function CurrentMeetingPage() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  if (dayOfWeek === 0) {
    sunday.setDate(today.getDate());
  } else {
    sunday.setDate(today.getDate() + (7 - dayOfWeek));
  }
  const dateString = sunday.toISOString().split('T')[0];

  console.log(dateString  + dayOfWeek +today.getDate())

  const currentMeeting = await getCurrentMeeting(dateString);
  if (!currentMeeting) {
    return (
      <main className="min-h-screen bg-slate-50 pb-20 mt-20">
        <div className="flex justify-center">
          <div className="mx-10 w-[75%] block text-center py-12 text-slate-500">
            No meeting scheduled for this Sunday.
          </div>
        </div>
      </main>
    );
  }


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