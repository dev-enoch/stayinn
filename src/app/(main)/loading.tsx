export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight animate-pulse">Loading Stayinn...</h2>
      </div>
    </div>
  );
}
