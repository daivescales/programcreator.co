export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-pc-white px-6">
      <div className="w-full max-w-md space-y-4">
        <div className="mx-auto h-3 w-24 animate-pulse rounded-full bg-pc-blue-100" />
        <div className="h-8 w-3/4 animate-pulse rounded-lg bg-pc-surface" />
        <div className="h-4 w-full animate-pulse rounded bg-pc-surface2" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-pc-surface2" />
      </div>
    </div>
  );
}
