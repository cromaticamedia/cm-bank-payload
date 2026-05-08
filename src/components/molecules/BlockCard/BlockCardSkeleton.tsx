export default function BlockCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-5 bg-neutral-900 dark:bg-neutral-300/50 border border-neutral-800 dark:border-neutral-700/50 rounded-xl animate-pulse">
      <div className="w-full aspect-video bg-neutral-800 dark:bg-neutral-400/30 rounded-lg" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-neutral-800 dark:bg-neutral-400/30 rounded" />
          <div className="h-4 w-16 bg-neutral-800 dark:bg-neutral-400/30 rounded-full" />
        </div>
        <div className="h-3 w-full bg-neutral-800 dark:bg-neutral-400/30 rounded" />
        <div className="h-3 w-2/3 bg-neutral-800 dark:bg-neutral-400/30 rounded" />
      </div>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-800 dark:border-neutral-700/50">
        <div className="h-3 w-24 bg-neutral-800 dark:bg-neutral-400/30 rounded" />
        <div className="h-3 w-4 bg-neutral-800 dark:bg-neutral-400/30 rounded" />
      </div>
    </div>
  )
}
