'use client'

import { SacramentMeeting } from "@/lib/types";
import { useState, useRef, useEffect } from "react";
import { Modal } from "./Modal";
import HoverOptions from "./edit/HoverOptions";
import { CalendarDays, UserCheck, Mic2, Sparkles, ArrowRight } from "lucide-react";

export default function MeetingCard(props: SacramentMeeting) {

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      const parent = element.closest('.bodyEl');
      if (parent) {
        (parent as HTMLElement).style.overflowY = isOpen ? 'hidden' : 'auto';
      }
    }
  }, [isOpen]);

  const overflowHidden = () => {
    setIsOpen(true);
  }

  // Format the date into a human-readable string (e.g., Sunday, May 24, 2026)
  const formattedDate = new Date(props.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // -------------------------------------------------------------
  // PRODUCTION CARD DISPLAY
  // -------------------------------------------------------------
  return (
    <article className="border border-slate-200/80 rounded-2xl shadow-xl bg-white overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} meeting={props} />

      {/* 1. Header Section (Deep Space Blue) */}
      <div className="bg-[#023047] px-6 py-5 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 relative overflow-hidden">
        {/* Subtle decorative background accent */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full pointer-events-none blur-2xl" />

        <div className="absolute top-2 right-2 group w-30">
          <HoverOptions s={props} />
        </div>

        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase">
              {props.meetingType} Meeting
            </h2>
            {props.stakeBusiness && (
              <span className="bg-button-bg text-[#023047] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-current" />
                SB
              </span>
            )}
          </div>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 font-medium flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-callout" />
            {formattedDate}
          </p>
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-6 text-gray-800 grow space-y-6">

        {/* Presiding & Conducting Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 py-5 bg-slate-50/70 rounded-xl border border-slate-100">
          <div className="border-b sm:border-b-0 sm:border-r border-slate-200/60 pb-3 sm:pb-0 sm:pr-4 flex items-start gap-1.5">
            <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-100 text-[#023047] mt-0.5">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-subheading text-[11px] font-bold uppercase tracking-widest mb-0.5">Presiding</h3>
              <p className="font-semibold text-header2 text-sm sm:text-base">{props.presiding}</p>
            </div>
          </div>
          <div className="sm:pl-2 flex items-start gap-1.5">
            <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-100 text-[#023047] mt-0.5">
              <Mic2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-subheading text-[11px] font-bold uppercase tracking-widest mb-0.5">Conducting</h3>
              <p className="font-semibold text-header2 text-sm sm:text-base truncate text-ellipsis min-w-0">{props.conducting}</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Program Action Footer */}
      <div className="px-6 pb-6 flex justify-center">
        <button 
          onClick={overflowHidden}
          ref={containerRef}
          className="group bg-header2 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#023047] hover:cursor-pointer w-full sm:w-[60%] flex items-center justify-center gap-2 shadow-md transition-all duration-200 active:scale-95"
        >
          <span>View program</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>

    </article>
  );
}