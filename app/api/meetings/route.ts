import { getMeetings } from "@/lib/meetings-db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const date = new URL(request.url).searchParams.get("date");
    const meetings = getMeetings(date);
    return NextResponse.json({
        success: true,
        data: meetings,
        status: 200,
    });
}

