import Image from "next/image";
import MeetingDetails from "@/components/MeetingDetail";
import { roboto } from "./fonts";

export default function Home() {
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
                  Discover God's plan of happiness for you
                </p>
              </section>
            </div>
          </div>
        </div>
        {/* <MeetingDetails /> */}
      </main>
    </div>
  );
}
