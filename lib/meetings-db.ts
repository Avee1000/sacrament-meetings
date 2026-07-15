import type { SacramentMeeting } from './types';

import { sql } from "@vercel/postgres";


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