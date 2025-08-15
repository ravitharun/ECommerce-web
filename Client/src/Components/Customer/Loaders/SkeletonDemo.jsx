import { cn } from "../../../lib/utils";

export function SkeletonDemo({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-gray-500/40", className)}
      {...props}
    >
    </div>
  );
}



