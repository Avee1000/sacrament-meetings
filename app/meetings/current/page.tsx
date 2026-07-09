import { notFound } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';
import MeetingDetail from '@/components/MeetingDetail';

export default async function CurrentMeetingPage() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek); // roll back to Sunday
  const dateString = sunday.toISOString().split('T')[0];

  const meetings = getMeetings(dateString);

  if (meetings.length === 0) {
    notFound();
  }

  // Assuming there's only one sacrament meeting per Sunday, take the first one
  const currentMeeting = meetings[0];

  return (
    <main className="min-h-screen bg-slate-50 pb-20 mt-20">
      <div className='flex justify-center'>
        <div className='mx-10'>
          <MeetingDetail meeting={currentMeeting} />
        </div>
      </div>
    </main>
  );
}