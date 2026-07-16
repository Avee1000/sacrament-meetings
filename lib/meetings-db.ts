import type { SacramentMeeting } from './types';
import { sql } from "@vercel/postgres";

const ITEMS_PER_PAGE = 6;


export async function getMeetings(date?: string | null): Promise<SacramentMeeting[]> {
  const { rows } = await sql<SacramentMeeting>`
  SELECT * FROM meetings ORDER BY id
  `;

  if (date) {
    return rows.filter(m => m.date === date);
  }

  return rows;
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  // return meetings.find(m => m.id === id) ?? null;
  const { rows } = await sql<SacramentMeeting>`
    SELECT * FROM meetings WHERE id = ${id}
  `;
  return rows[0] ?? null;
}

export async function getMeetingsTotalPages(
  query: string = ''
){
  const searchTerm = `%${query}%`;
  const { rows } = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR "meetingType" ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  const pageNumber = Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
  console.log(pageNumber);
  return pageNumber;

}