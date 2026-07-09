import { SacramentMeeting } from "@/lib/types";

export default function MeetingCard(props: SacramentMeeting) {


  // Format the date into a human-readable string (e.g., Sunday, May 24, 2026)
  const formattedDate = new Date(props.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // -------------------------------------------------------------
  // PRODUCTION CARD DISPLAY
  // -------------------------------------------------------------
  return (
    <article className="border border-slate-200 rounded-xl shadow-lg bg-white overflow-hidden flex flex-col transition-all hover:shadow-xl">
      
      {/* 1. Header Section (Deep Space Blue) */}
      <div className="bg-[#023047] p-5 text-white flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-widest text-callout">
            {props.meetingType} Meeting
          </h2>
          <p className="text-background text-sm mt-1 font-medium">{formattedDate}</p>
        </div>
        
        {/* Stake Business Badge */}
        {props.stakeBusiness && (
          <span className="bg-button-bg text-[#023047] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
            Stake Business
          </span>
        )}
      </div>

      {/* 2. Content Body */}
      <div className="p-6 text-gray-800 grow space-y-6">
        
        {/* Presiding & Conducting */}
        <div className="flex flex-col sm:flex-row sm:justify-between pb-4 border-b border-gray-100 gap-4">
          <div>
            <h3 className="text-subheading text-xs font-bold uppercase tracking-wider mb-1">Presiding</h3>
            <p className="font-semibold text-header2">{props.presiding}</p>
          </div>
          <div className="sm:text-right">
            <h3 className="text-subheading text-xs font-bold uppercase tracking-wider mb-1">Conducting</h3>
            <p className="font-semibold text-header2">{props.conducting}</p>
          </div>
        </div>

        {/* Opening Program */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 border-l-4 border-l-subheading">
            <h3 className="text-subheading text-xs font-bold uppercase tracking-wider mb-1">Opening Hymn</h3>
            <p className="font-bold text-[#023047] text-lg">#{props.openingHymn.number}</p>
            <p className="text-sm italic text-gray-600">{props.openingHymn.title}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 border-l-4 border-l-subheading">
            <h3 className="text-subheading text-xs font-bold uppercase tracking-wider mb-1">Opening Prayer</h3>
            <p className="font-medium text-[#023047] mt-1">{props.openingPrayer}</p>
          </div>
        </div>

        {/* Ward Business */}
        {props.wardBusiness.length > 0 && (
          <div>
            <h3 className="text-subheading text-sm font-bold uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">Ward Business</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
              {props.wardBusiness.map((wb, idx) => (
                <li key={idx} className="leading-relaxed">{wb.description}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Sacrament Hymn Callout */}
        <div className="bg-[#f0f8fb] p-5 rounded-lg text-center border border-background shadow-sm">
          <h3 className="text-subheading text-xs font-bold uppercase tracking-wider mb-1">Sacrament Hymn</h3>
          <p className="font-bold text-xl text-header2">#{props.sacramentHymn.number}</p>
          <p className="italic text-gray-700 mt-1">{props.sacramentHymn.title}</p>
        </div>

        {/* Speakers & Program */}
        {props.speakers.length > 0 && (
          <div>
            <h3 className="text-subheading text-sm font-bold uppercase tracking-wider mb-3 border-b border-gray-100 pb-1">Speakers & Program</h3>
            <div className="space-y-4 mt-3">
              {props.speakers.map((speaker, idx) => (
                <div key={idx} className="flex flex-col bg-white p-3 rounded border border-gray-50 shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-header2 text-lg">{speaker.name}</span>
                    <span className="text-[10px] bg-button text-button-bg px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                      {speaker.type.replace('-', ' ')}
                    </span>
                  </div>
                  {speaker.topic && <span className="text-sm text-gray-600 mt-1">Topic: {speaker.topic}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Closing Program */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 border-l-4 border-l-header2">
            <h3 className="text-subheading text-xs font-bold uppercase tracking-wider mb-1">Closing Hymn</h3>
            <p className="font-bold text-[#023047] text-lg">#{props.closingHymn.number}</p>
            <p className="text-sm italic text-gray-600">{props.closingHymn.title}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 border-l-4 border-l-header2">
            <h3 className="text-subheading text-xs font-bold uppercase tracking-wider mb-1">Closing Prayer</h3>
            <p className="font-medium text-[#023047] mt-1">{props.closingPrayer}</p>
          </div>
        </div>

        {/* Announcements Callout (Amber Flame Theme) */}
        {props.announcements && props.announcements.length > 0 && (
          <div className="bg-[#fff9ea] p-4 rounded-lg border border-callout">
            <h3 className="text-button-bg text-sm font-bold uppercase tracking-wider mb-2">Announcements</h3>
            <ul className="list-disc list-inside text-sm text-header2 space-y-1">
              {props.announcements.map((ann, idx) => (
                <li key={idx} className="font-medium">{ann}</li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </article>
  );
}