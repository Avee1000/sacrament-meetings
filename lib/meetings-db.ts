import type { SacramentMeeting } from './types';


const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [
      { description: 'Sustaining of new Primary president, Sister Miller' },
      { description: 'Release of Sister Roberts from Activity Day leader' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 292, title: 'Oh, My Father' },
    openingPrayer: 'Brother Smith',
    wardBusiness: [
      { description: 'Welcome new ward members: The Henderson family' },
      { description: 'Sustaining of Brother Thompson as assistant ward clerk' },
      { description: 'Announcement of upcoming Ward Temple Recommend interviews' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
    speakers: [],
    closingHymn: { number: 159, title: 'Did You Think to Pray?' },
    closingPrayer: 'Sister Green',
    announcements: []
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Sister Brown',
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother White',
    wardBusiness: [
      { description: 'Sustaining of Brother Evans as Sunday School teacher' },
      { description: 'Release of Brother Henderson from ward mission leader' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" },
    speakers: [
      { name: 'Brother Johnson', topic: 'The Power of the Holy Ghost', type: 'speaker' },
      { name: 'Sister Davis', topic: 'Service and Charity', type: 'speaker' }
    ],
    closingHymn: { number: 136, title: 'I Believe in Christ' },
    closingPrayer: 'Brother Black',
    announcements: ['Ward potluck next Sunday']
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'stake',
    presiding: 'Stake President',
    conducting: 'Stake President',
    openingHymn: { number: 27, title: 'Praise to the Man' },
    openingPrayer: 'Stake High Councilor',
    wardBusiness: [
      { description: 'Report on the successful ward service project' },
      { description: 'Call for volunteers for the upcoming stake welfare farm day' }
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 194, title: "There Is a Green Hill Far Away" },
    speakers: [
      { name: 'Stake President', topic: 'The Importance of Temples', type: 'speaker' }
    ],
    closingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    closingPrayer: 'Stake High Councilor',
    announcements: ['Stake conference next month']
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Johnson',
    openingHymn: { number: 134, title: 'I Believe in Christ' },
    openingPrayer: 'Sister Peterson',
    wardBusiness: [
      { description: 'Release of Sister Clark from Relief Society presidency' },
      { description: 'Sustaining of Sister Taylor as new Relief Society counselor' },
      { description: 'Sustaining of Brother and Sister Nelson as ward service missionaries' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 180, title: "Our Savior's Love" },
    speakers: [
      { name: 'Brother Miller', topic: 'The Atonement of Jesus Christ', type: 'speaker' },
      { name: 'Sister White', topic: 'Repentance and Forgiveness', type: 'speaker' }
    ],
    closingHymn: { number: 100, title: 'Nearer, My God, to Thee' },
    closingPrayer: 'Brother Green',
    announcements: ['Ward cleanup project: June 6']
  },
  {
    id: 6,
    date: '2026-06-07',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Sister Brown',
    openingHymn: { number: 296, title: 'Our Father, by Whose Name' },
    openingPrayer: 'Brother Davis',
    wardBusiness: [
      { description: 'Recognition of high school graduates' },
      { description: 'Announcing the new ward choir director, Brother Scott' },
      { description: 'Sustaining of Sister King as Beehive advisor' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 177, title: "Reverently and Meekly Now" },
    speakers: [],
    closingHymn: { number: 147, title: 'Gratitude' },
    closingPrayer: 'Sister Johnson',
    announcements: []
  },
  {
    id: 7,
    date: '2026-06-14',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'Brother Black',
    wardBusiness: [
      { description: 'Release of Sister Peterson from Primary presidency' },
      { description: 'Sustaining of Brother Adams as ward clerk' },
      { description: 'Sustaining of Sister Garcia as organist' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [
      { name: 'Brother Peterson', topic: 'The Importance of Family History', type: 'speaker' },
      { name: 'Sister Smith', topic: 'Temple Ordinances', type: 'speaker' }
    ],
    closingHymn: { number: 200, title: 'God Be With You Till We Meet Again' },
    closingPrayer: 'Sister Williams',
    announcements: ['Youth conference next month']
  },
  {
    id: 8,
    date: '2026-06-21',
    meetingType: 'general',
    presiding: 'First Presidency',
    conducting: 'Quorum of the Twelve Apostles',
    openingHymn: { number: 26, title: 'Joseph Smith’s First Prayer' },
    openingPrayer: 'General Authority',
    wardBusiness: [
      { description: 'Special message from the Stake regarding upcoming summer youth activities' },
      { description: 'Announcement of the quarterly ward budget report review' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 199, title: "There Is a Fountain" },
    speakers: [
      { name: 'President Nelson', topic: 'The Gathering of Israel', type: 'speaker' },
      { name: 'Elder Holland', topic: 'The Ministry of Jesus Christ', type: 'speaker' }
    ],
    closingHymn: { number: 333, title: 'High on the Mountain Top' },
    closingPrayer: 'General Authority',
    announcements: ['Next General Conference: October']
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}