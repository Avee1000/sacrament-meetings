'use client';
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print w-[25%] py-2 bg-slate-50 hover:bg-slate-100 font-bold border-t border-slate-200 text-sm tracking-tight cursor-pointer my-0 mx-auto rounded-lg"
    >
      print
    </button>
  );
}