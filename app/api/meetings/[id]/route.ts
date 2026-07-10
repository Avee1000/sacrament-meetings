import { getMeetingById } from '@/lib/meetings-db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    return NextResponse.json({ error: 'Invalid meeting ID', status: 400 });
  }

  const meeting = getMeetingById(numericId);

  if (!meeting) {
    return NextResponse.json({ error: 'Meeting not found', status: 404 });
  }

  return NextResponse.json({ success: true, data: meeting, status: 200 });
}