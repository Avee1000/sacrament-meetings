import { getMeetings } from "@/lib/meetings-db";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request): Promise<NextResponse>{
    const date = new URL(request.url).searchParams.get("date");
    const meetings = await getMeetings(date);

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

