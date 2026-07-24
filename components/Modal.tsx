import { useState } from "react";
import { SacramentMeeting } from "@/lib/types";
import PrintButton from "./PrintButton";
import { X } from "lucide-react";
import MeetingDetail from "./MeetingDetail";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;

  meeting: SacramentMeeting;
}


export function Modal({ isOpen, onClose, meeting }: ModalProps) {
  const [isExiting, setIsExiting] = useState(false);
  if (!isOpen && !isExiting) return null;

  const handleClose = () => setIsExiting(true);

  const handleAnimationEnd = () => {
    if (isExiting) {
      setIsExiting(false);
      onClose();
    }
  };

  return (
    <dialog
      // open={isOpen}
      onClick={handleClose}
      className={`fixed inset-0 m-0 h-full w-full bg-black/80 flex justify-center items-center backdrop-blur-md z-50 p-4 transition-opacity duration-300 ${isExiting ? "opacity-0" : "opacity-100 animate-in fade-in"
        }`}    >
      {/* 
        This is the main card container. 
        'overflow-hidden' ensures the rounded corners are respected.
        'flex flex-col' keeps the close button at the bottom.
      */}
      <div
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
        className={`relative shadow-xl w-full max-w-2xl flex flex-col rounded-2xl overflow-hidden ${isExiting
          ? "animate-out fade-out slide-out-to-bottom-10 duration-300"
          : "animate-in fade-in slide-in-from-bottom-5 duration-300"
          }`}
      >
        <div className="absolute left-0 top-0 size-10 bg-white flex justify-center rounded-full cursor-pointer">
          <PrintButton />
        </div>

        {/* Content area scrolls independently */}
        <div>
          <MeetingDetail meeting={meeting} />
        </div>

        {/* Close button is part of the card, not the scrollable area */}
        <div className="absolute right-0 top-0 size-10 bg-white flex justify-center rounded-full cursor-pointer">
          <button
            onClick={handleClose}
            className="cursor-pointer"
          >
            <X className="size-6" />
          </button>
        </div>
      </div>
    </dialog>
  );
}