import { getMeetingById } from '@/lib/meetings-db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    return NextResponse.json(
      { error: 'Invalid meeting ID', status: 400 }, // 1. JSON Body
      { status: 400 }                               // 2. HTTP Status Code
    );
  }

  const meeting =  await getMeetingById(numericId);

  if (!meeting) {
    return NextResponse.json(
      { error: 'Meeting not found', status: 404 },  // 1. JSON Body
      { status: 404 }                               // 2. HTTP Status Code
    );
  }

  return NextResponse.json(
    { success: true, data: meeting, status: 200 },  // 1. JSON Body
    { status: 200 }                                 // 2. HTTP Status Code
  );
}