import { cn } from "@/lib/utils";

// Shared, responsive empty-state for profile tabs (no posts / no content yet).
//
// Usage:
//   <EmptyState
//     icon={Film}
//     title="No recent content yet"
//     description="Share your latest work to showcase it here."
//     action={<Button ...>Add content</Button>}   // optional
//   />
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/60 px-4 py-10 text-center sm:px-6 sm:py-14",
        className
      )}
    >
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100 sm:h-14 sm:w-14">
          <Icon className="h-6 w-6 text-gray-400 sm:h-7 sm:w-7" />
        </div>
      )}
      <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-gray-500">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
