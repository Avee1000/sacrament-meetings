'use client'

import { SacramentMeeting } from "@/lib/types";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Modal } from "./Modal";
import HoverOptions from "./edit/HoverOptions";

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
    setIsOpen(true)
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
    <article className="border border-slate-200 rounded-xl shadow-lg bg-white overflow-hidden flex flex-col transition-all hover:shadow-xl">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} meeting={props} />
      {/* 1. Header Section (Deep Space Blue) */}
      <div className="bg-[#023047] p-5 text-white flex justify-between items-center relative">
        <div className="absolute top-3 right-3 group w-30 ">
          <HoverOptions />
        </div>
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-callout">
            {props.meetingType} Meeting
          </h2>
          <p className="text-background text-sm mt-1 font-medium">{formattedDate}</p>
        </div>

        {/* Stake Business Badge */}
        {props.stakeBusiness && (
          <span className="bg-button-bg text-[#023047] mt-auto text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
            Stake Business
          </span>
        )}
      </div>

      {/* 2. Content Body */}
      <div className="p-6 text-gray-800 grow space-y-6">

        {/* Presiding & Conducting */}
        <div className="flex flex-col sm:flex-row sm:justify-between pb-4 border-b border-gray-100 gap-4">
          <div>
            <h3 className="text-subheading text-xs font-bold uppercase tracking-wider mb-1">Presiding</h3>
            <p className="font-semibold text-header2">{props.presiding}</p>
          </div>
          <div className="sm:text-right">
            <h3 className="text-subheading text-xs font-bold uppercase tracking-wider mb-1">Conducting</h3>
            <p className="font-semibold text-header2">{props.conducting}</p>
          </div>
        </div>
      </div>
      {/* Opening the modal is now just a link */}
      <div className="w-100 flex justify-center">
        <button onClick={overflowHidden}
          ref={containerRef}
          className="bg-header2 text-white px-6 py-2 rounded-md font-medium hover:cursor-pointer w-[50%] mb-4"
        >View program
        </button>
      </div>

    </article>
  );
}