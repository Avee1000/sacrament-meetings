export default function Loading() {
  return (
    <div className="flex h-lvh items-center justify-center flex-col">
      <div className="flex space-x-4">
        <svg
          className="mr-3 size-10 animate-spin text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          {/* Draws the faint background ring */}
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="7"
            stroke="currentColor"
            strokeWidth="3"
          ></circle>
          {/* Draws the solid spinning slice */}
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <span className="ml-3 text-sm text-gray-600">Loading meetings.</span>
    </div>
  );
}