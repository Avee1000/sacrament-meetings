import { getMeetings } from "@/lib/meetings-db";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { SacramentMeeting } from "@/lib/types";

const ITEMS_PER_PAGE = 6;


export async function GET(request: Request): Promise<NextResponse> {
    const date = new URL(request.url).searchParams.get("date");
    const meetings = await getMeetings(date);
    //   await new Promise(res => setTimeout(res, 50000));


    if (!meetings || meetings.length === 0) {
        return NextResponse.json(
            { error: 'Meeting not found', status: 404 }, // 1. JSON Body
            { status: 404 }                              // 2. HTTP Status Code
        );
    }

    return NextResponse.json({
        success: true,
        data: meetings,
        status: 200,
    });
}

export async function fetchFilteredMeetings(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const searchTerm = `%${query}%`;
    const { rows } = await sql<SacramentMeeting>`
    SELECT * FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR "meetingType" ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows;
}

export async function countMeetings(query: string): Promise<number> {
    const searchTerm = `%${query}%`;
    if (searchTerm === ' ') {
        const { rows } = await sql`
        SELECT COUNT(*) FROM meetings
        `;
        const rowCount = Number(rows[0].count);
        return rowCount;
    }
    const { rows } = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR "meetingType" ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    `;
    const rowCount = Number(rows[0].count);
    return rowCount;
}

