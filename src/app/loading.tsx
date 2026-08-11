export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-navy-800 px-6">
      <div className="w-full max-w-md space-y-4">
        <div className="mx-auto h-3 w-24 animate-pulse bg-accent/30" />
        <div className="h-8 w-3/4 animate-pulse bg-navy-700" />
        <div className="h-4 w-full animate-pulse bg-navy-700/80" />
        <div className="h-4 w-5/6 animate-pulse bg-navy-700/80" />
      </div>
    </div>
  );
}
