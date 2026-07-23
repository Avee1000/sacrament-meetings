export default function Loading() {
  return (
    // <div className="flex h-full  items-center justify-center justify-self-center self-center flex-col">
    //   <div className="flex space-x-4">
    //     <svg
    //       className="mr-3 size-10 animate-spin text-black"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //     >
    //       {/* Draws the faint background ring */}
    //       <circle
    //         className="opacity-25"
    //         cx="12"
    //         cy="12"
    //         r="7"
    //         stroke="currentColor"
    //         strokeWidth="3"
    //       ></circle>
    //       {/* Draws the solid spinning slice */}
    //       <path
    //         className="opacity-75"
    //         fill="currentColor"
    //         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    //       ></path>
    //     </svg>
    //   </div>
    //   <span className="ml-3 text-sm text-gray-600">Loading meetings.</span>
    // </div>
    <div className="col-span-full w-full grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <article 
          key={index} 
          className="border border-slate-200 rounded-xl shadow-lg bg-white overflow-hidden flex flex-col animate-pulse"
        >
          {/* 1. Header Section Skeleton */}
          <div className="bg-[#023047]/90 p-5 flex justify-between items-start relative">
            <div className="space-y-2 w-2/3">
              {/* Meeting Type Skeleton */}
              <div className="h-7 bg-white/20 rounded-md w-3/4"></div>
              {/* Formatted Date Skeleton */}
              <div className="h-4 bg-white/10 rounded-md w-1/2"></div>
            </div>

            {/* Stake Business Badge Skeleton */}
            <div className="h-6 w-24 bg-white/20 rounded-full"></div>
          </div>

          {/* 2. Content Body Skeleton */}
          <div className="p-6 grow space-y-6">
            {/* Presiding & Conducting Section Skeleton */}
            <div className="flex flex-col sm:flex-row sm:justify-between pb-4 border-b border-gray-100 gap-4">
              <div className="space-y-2 w-1/2">
                <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                <div className="h-5 bg-slate-300 rounded w-4/5"></div>
              </div>
              <div className="sm:text-right space-y-2 w-1/2 sm:flex sm:flex-col sm:items-end">
                <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                <div className="h-5 bg-slate-300 rounded w-4/5"></div>
              </div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="w-full flex justify-center pb-4">
            <div className="h-10 bg-slate-200 rounded-md w-[50%]"></div>
          </div>
        </article>
      ))}
    </div>
  );
}