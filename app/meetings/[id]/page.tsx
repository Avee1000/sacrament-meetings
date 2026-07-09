import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import MeetingDetail from '@/components/MeetingDetail';

export default async function MeetingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const meeting = getMeetingById(Number(params.id));

  if (!meeting) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <MeetingDetail meeting={meeting} />
      </div>
    </main>
  );
}