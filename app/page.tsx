import Image from "next/image";
import MeetingDetails from "@/components/MeetingDetails";
import { roboto } from "./fonts";
import type { SacramentMeeting } from '@/lib/types';
import { Suspense } from 'react';

async function getMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const res = await fetch(new URL('/api/meetings', baseUrl).toString(), { cache: 'no-store' });

  if (!res.ok) throw new Error("Failed to fetch meetings");
  const json = await res.json();
  return json.data as SacramentMeeting[];
}

export default async function Home() {
  const meetings = getMeetings();

  return (
    <div className="block w-full">
      <main className="">
        <div className="relative h-[80dvh] w-full">
          <div className="absolute inset-0">
            <Image
              src="/hero.png"
              alt="Sacrament Meeting"
              fill
              className="object-cover"
              priority />
            <div className="absolute inset-0 bg-black/85" />
          </div>
          <div className="onTop relative  flex flex-row-reverse h-full items-center px-0 sm:px-12 max-sm:flex max-sm:justify-center max-sm:text-center">
            <div className="relative w-[70.5%] top-12 p-8 rounded-lg sm:ml-13 text-text-body">
              <section className="text-right flex flex-col gap-3">
                <span className='border-t-4 border-button-bg block max-sm:my-3 w-15 ml-auto mr-0'></span>
                <p className={`text-hero h-auto font-black leading-tight`}>
                  Review, Plan, Manage your Sacrament Meeting agenda
                </p>
                <p className={`${roboto.className} text-[clamp(0.5rem,2vw,1.5rem)] my-2 leading-5.5 tracking-tight font-thin italic max-sm:leading-2.5`}>
                  Discover God&apos;s plan of happiness for you
                </p>
              </section>
            </div>
          </div>
        </div>
        <Suspense fallback={<div className="flex h-[60vh] items-center justify-center"><div className="flex space-x-4"><div className="h-4 w-4 rounded-full animate-pulse bg-white"></div><div className="h-4 w-4 rounded-full animate-pulse bg-white"></div><div className="h-4 w-4 rounded-full animate-pulse bg-white"></div></div><span className="ml-3 text-sm text-gray-600">Loading meetings...</span></div>}>
        </Suspense>
      </main>
    </div>
  );
}