import { SkeletonDemo } from "../Loaders/SkeletonDemo";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 max-w-sm p-4 border rounded-lg shadow-sm">
      {/* Image placeholder */}
      <SkeletonDemo className="h-[150px] w-full rounded-xl p-5" />
      {/* Title placeholder */}
      <SkeletonDemo className="h-5 w-3/4 p-2" />
      {/* Subtitle placeholder */}
      <SkeletonDemo className="h-4 w-1/2 p-5" />

      {/* Button placeholder */}
      <SkeletonDemo className="h-8 w-24 p-5" />
    </div>
  );
}
