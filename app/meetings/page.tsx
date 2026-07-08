import MeetingDetails from '@/components/MeetingDetail';

export default function MeetingsPage() {
  return (
    <main className="min-h-screen bg-background text-text-body px-6 py-12">
      <section className="mx-auto max-w-6xl rounded-3xl bg-white/5 p-8 shadow-xl shadow-black/10 backdrop-blur-sm">
        <h1 className="mb-4 text-4xl font-black text-white">Meetings</h1>
        <p className="mb-8 max-w-2xl text-lg leading-8 text-white/80">
          Review your agenda, manage meeting notes, and track attendance in one place.
        </p>
        {/* <MeetingDetails /> */}
      </section>
    </main>
  );
}
