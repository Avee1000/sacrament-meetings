import { SacramentMeeting } from "@/lib/types";
import { 
  CalendarDays, 
  UserCheck, 
  Mic2, 
  Music, 
  BookOpen, 
  Megaphone, 
  Sparkles, 
  CheckCircle2, 
  HeartHandshake 
} from "lucide-react";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  // Format the date into a human-readable string (e.g., Sunday, May 24, 2026)
  const formattedDate = new Date(meeting.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const musicalNumbers = meeting.speakers.filter(s => s.type === 'musical-number');
  const standardSpeakers = meeting.speakers.filter(s => s.type !== 'musical-number');

  return (
    <article className="w-full max-w-3xl mx-auto bg-white border border-slate-200/80 rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all duration-300">

      {/* 1. Header Section (Deep Space Blue) */}
      <div className="bg-[#023047] px-8 py-6 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 relative overflow-hidden">
        {/* Subtle decorative background accent */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none blur-2xl" />

        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black tracking-wider text-white uppercase">
              {meeting.meetingType} MEETING
            </h2>
            {meeting.stakeBusiness && (
              <span className="bg-button-bg text-[#023047] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 fill-current" />
                Stake Business
              </span>
            )}
          </div>
          <p className="text-slate-300 text-sm mt-1 font-medium flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-callout" />
            {formattedDate}
          </p>
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-6 sm:p-8 text-gray-800 space-y-6">

        {/* Presiding & Conducting Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50/70 rounded-xl border border-slate-100">
          <div className="border-b sm:border-b-0 sm:border-r border-slate-200/60 pb-3 sm:pb-0 sm:pr-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-100 text-[#023047] mt-0.5">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-subheading text-[11px] font-bold uppercase tracking-widest mb-0.5">Presiding</h3>
              <p className="font-semibold text-header2 text-base">{meeting.presiding}</p>
            </div>
          </div>
          <div className="sm:pl-2 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-100 text-[#023047] mt-0.5">
              <Mic2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-subheading text-[11px] font-bold uppercase tracking-widest mb-0.5">Conducting</h3>
              <p className="font-semibold text-header2 text-base">{meeting.conducting}</p>
            </div>
          </div>
        </div>

        {/* Opening Program */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs border-l-4 border-l-[#023047] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-subheading text-[11px] font-bold uppercase tracking-widest">Opening Hymn</h3>
                <Music className="w-4 h-4 text-[#023047]/60" />
              </div>
              <p className="font-extrabold text-[#023047] text-xl">#{meeting.openingHymn.number}</p>
              <p className="text-sm italic text-gray-600 mt-0.5">{meeting.openingHymn.title}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs border-l-4 border-l-subheading flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-subheading text-[11px] font-bold uppercase tracking-widest">Opening Prayer</h3>
                <HeartHandshake className="w-4 h-4 text-subheading" />
              </div>
              <p className="font-semibold text-header2 text-base mt-1">{meeting.openingPrayer}</p>
            </div>
          </div>
        </div>

        {/* Ward Business */}
        {meeting.wardBusiness.length > 0 && (
          <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100">
            <h3 className="text-subheading text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-subheading" />
              Ward Business
            </h3>
            <ul className="space-y-2">
              {meeting.wardBusiness.map((wb, idx) => (
                <li key={idx} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2.5">
                  <span className="text-subheading font-bold select-none">•</span>
                  <span>{wb.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sacrament Hymn Featured Banner */}
        <div className="bg-linear-to-br from-[#f0f8fb] to-white p-6 rounded-2xl text-center border border-[#023047]/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-24 h-24 bg-[#023047]/5 rounded-full pointer-events-none"></div>
          <div className="flex justify-center mb-1">
            <Music className="w-5 h-5 text-[#023047]" />
          </div>
          <h3 className="text-subheading text-xs font-bold uppercase tracking-widest mb-1">Sacrament Hymn</h3>
          <p className="font-black text-2xl text-header2 tracking-tight">#{meeting.sacramentHymn.number}</p>
          <p className="italic text-gray-700 mt-1 text-sm font-medium">{meeting.sacramentHymn.title}</p>
        </div>

        {/* Speakers Section */}
        {standardSpeakers.length > 0 && (
          <div>
            <h3 className="text-subheading text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-subheading" />
              Speakers
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {standardSpeakers.map((speaker, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs hover:border-slate-300 transition-colors gap-2">
                  <div>
                    <span className="font-bold text-header2 text-base block">{speaker.name}</span>
                    {speaker.topic && <span className="text-xs text-gray-600 block mt-0.5">Topic: <span className="font-medium">{speaker.topic}</span></span>}
                  </div>
                  <span className="self-start sm:self-center text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md uppercase font-extrabold tracking-wider border border-slate-200/50">
                    {speaker.type.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Musical Numbers Section */}
        {musicalNumbers.length > 0 && (
          <div>
            <h3 className="text-subheading text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <Music className="w-4 h-4 text-subheading" />
              Musical Numbers
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {musicalNumbers.map((singer, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs gap-2">
                  <div>
                    <span className="font-bold text-header2 text-base block">{singer.name}</span>
                    {singer.topic && <span className="text-xs text-gray-600 block mt-0.5">Selection: <span className="font-medium italic">{singer.topic}</span></span>}
                  </div>
                  <span className="self-start sm:self-center text-[10px] bg-button text-button-bg px-2.5 py-1 rounded-md uppercase font-extrabold tracking-wider">
                    Musical Number
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Closing Program */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs border-l-4 border-l-[#023047] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-subheading text-[11px] font-bold uppercase tracking-widest">Closing Hymn</h3>
                <Music className="w-4 h-4 text-[#023047]/60" />
              </div>
              <p className="font-extrabold text-[#023047] text-xl">#{meeting.closingHymn.number}</p>
              <p className="text-sm italic text-gray-600 mt-0.5">{meeting.closingHymn.title}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs border-l-4 border-l-subheading flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-subheading text-[11px] font-bold uppercase tracking-widest">Closing Prayer</h3>
                <HeartHandshake className="w-4 h-4 text-subheading" />
              </div>
              <p className="font-semibold text-header2 text-base mt-1">{meeting.closingPrayer}</p>
            </div>
          </div>
        </div>

        {/* Announcements Callout */}
        {meeting.announcements && meeting.announcements.length > 0 && (
          <div className="bg-[#fff9ea] p-5 rounded-2xl border border-callout/40 shadow-xs">
            <h3 className="text-button-bg text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-button-bg" />
              Announcements
            </h3>
            <ul className="space-y-1.5 mt-2">
              {meeting.announcements.map((ann, idx) => (
                <li key={idx} className="text-sm font-medium text-header2 flex items-start gap-2.5">
                  <span className="text-button-bg font-bold select-none">•</span>
                  <span>{ann}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </article>
  );
}