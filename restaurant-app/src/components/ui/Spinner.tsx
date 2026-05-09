import { cn } from "../../lib/utils"

export function Spinner({ className }: { className?: string }) {
  return (
    <div className="flex justify-center items-center py-10 w-full">
      <div className={cn("animate-spin rounded-full h-12 w-12 border-b-2 border-primary", className)}></div>
    </div>
  )
}
