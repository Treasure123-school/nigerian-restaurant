import { cn } from "../../lib/utils"

export function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-white", className)}>
      {children}
    </span>
  )
}
