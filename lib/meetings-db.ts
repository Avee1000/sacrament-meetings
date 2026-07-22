import type { SacramentMeeting } from './types';
import { sql } from "@vercel/postgres";

const ITEMS_PER_PAGE = 6;


export async function getMeetings(date?: string | null): Promise<SacramentMeeting[]> {
// Use a parameterized query to handle the optional filter safely
  const query = date 
    ? sql<SacramentMeeting>`SELECT * FROM meetings WHERE date = ${date} ORDER BY id`
    : sql<SacramentMeeting>`SELECT * FROM meetings ORDER BY id`;

  const { rows } = await query;

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
  return pageNumber;
}

export async function getLastPage(): Promise<number> {
        const { rows } = await sql`
        SELECT COUNT(*) FROM meetings
        `;
  const pageNumber = Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
  console.log(pageNumber + 'last page')
  return pageNumber;
}

