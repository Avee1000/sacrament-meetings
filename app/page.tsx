import { Metadata } from "next";
import Image from "next/image";
import { roboto } from "./fonts";
import Link from "next/link";
import { auth } from "@/auth";
import LoginSignup from "@/components/accounts/LoginSignup";

export const metadata: Metadata = {
  title: 'Sacrament Meetings Planner Home',
};

export default async function Home() {

  const session = await auth();


  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex flex-col flex-1 w-full">
        <div className="relative flex-1 w-full flex items-center">
          <div className="absolute inset-0">
            <Image
              src="/hero.png"
              alt="Sacrament Meeting"
              fill
              className="object-cover"
              priority />
            <div className="absolute inset-0 bg-black/85" />
          </div>
          <div className="onTop relative flex flex-row-reverse h-full items-center px-0 sm:px-12 max-sm:flex max-sm:justify-center max-sm:text-center">
            <div className="relative w-[70.5%] top-12 p-8 rounded-lg sm:ml-12 text-text-body">
              <section className="sm:text-right flex flex-col gap-3">
                <span className="border-t-4 border-button-bg block max-sm:my-3 w-16 sm:ml-auto sm:mr-0 max-sm:mx-auto"></span>
                <p className="text-[3rem] sm:text-hero h-auto font-black leading-tight">
                  Review, Plan, Manage your Sacrament Meeting agenda
                </p>
                <p className={`${roboto.className} text-[clamp(1.5rem,2vw,1.5rem)] my-2 leading-5.5 tracking-tight font-thin italic`}>
                  Discover God&apos;s plan of happiness for you
                </p>
              </section>
              <div className="sm:hidden inline-flex justify-center mt-6">
                {!session && (
                  <div>
                    <LoginSignup />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}
