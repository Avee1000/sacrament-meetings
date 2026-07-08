import { SacramentMeeting, WardBusinessItem } from "@/lib/types";

export default function MeetingCard(s: SacramentMeeting ) {
  return (
    <article className="p-4 border border-gray-600 bg-gray-50 rounded">
      <h3 className=" text-black text-xl font-bold mb-2">{s.meetingType}</h3>
      <p className="text-gray-700 mb-3">{s.presiding}</p>
      <p className="text-gray-700 mb-3">{s.conducting}</p>
      <div>
        <p>{s.openingHymn.number}, {s.openingHymn.title}</p>
      </div>
      <p>{s.openingPrayer}</p>
      <div>
        {s.wardBusiness.map((wb: WardBusinessItem) => (
          <p key={wb.description}>{wb.description}</p>
        ))}
      </div>
      <p>{s.sacramentHymn.number}</p>

    </article>
  );
}