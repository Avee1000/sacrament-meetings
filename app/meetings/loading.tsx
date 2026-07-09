export default function Loading() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="flex space-x-4">
        <div className="h-4 w-4 rounded-full animate-pulse bg-white"></div>
        <div className="h-4 w-4 rounded-full animate-pulse bg-white"></div>
        <div className="h-4 w-4 rounded-full animate-pulse bg-white"></div>
      </div>
      <span className="ml-3 text-sm text-gray-600">Loading meetings...</span>
    </div>
  );
}