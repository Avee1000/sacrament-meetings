import React from "react";
import { Button } from "../ui/button";

export default function CreateMeetingButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

  return (
    <Button
    {...props}
    className="bg-subheading hover:bg-header2 text-white px-5 py-5.5 rounded-lg text-sm font-bold transition-colors shadow-sm flex items-center gap-2 hover:cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      Schedule Meeting
    </Button>
  )
}