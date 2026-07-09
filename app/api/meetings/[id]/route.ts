import { getMeetingById } from '@/lib/meetings-db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid meeting ID' }, { status: 400 });
  }

  const meeting = getMeetingById(id);

  if (!meeting) {
    return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
  }

  return NextResponse.json(meeting);
}
