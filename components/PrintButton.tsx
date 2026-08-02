'use client';

import { Printer } from "lucide-react";
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print cursor-pointer"
    >
      <Printer className="size-6"/>
    </button>
  );
}