"use client"; // Error boundaries must be Client Components!

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to a service like Sentry or Datadog
    console.error("Route error caught:", error);
  }, [error]);

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">
          Something went wrong!
        </h2>
        <p className="max-w-md text-sm text-gray-600">
          We had trouble loading this page. You can try fetching the data again.
        </p>
      </div>
      
      <button
        // The reset function tells Next.js to attempt to re-render the route
        onClick={() => reset()}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}