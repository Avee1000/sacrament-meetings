import Image from "next/image";
import MeetingDetails from "@/components/MeetingDetail";

export default function Home() {
  return (
    <div className="bg-background block w-full">
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
            <div className="w-[70.5%] p-8 rounded-lg sm:ml-13 text-text-body">
              <section className="text-right">
                <span className='border-t-4 border-button-bg block my-4.5 max-sm:my-3 w-15 ml-auto mr-0'></span>

                <p className={` text-hero font-black leading-tight transform scale-y-110`}>
                  Review, Plan, Manage your Sacrament Meeting agenda
                </p>
                <p className={`text-[clamp(0.5rem,2vw,1.5rem)] leading-5.5 tracking-tight font-[250] italic max-sm:leading-2.5`}>

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
