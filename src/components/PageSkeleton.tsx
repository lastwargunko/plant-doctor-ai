import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 animate-pulse">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-9 w-72" />
            <Skeleton className="h-5 w-56" />
          </div>
          <Skeleton className="h-11 w-36" />
        </div>
      </section>

      {/* Statistics */}
      <section className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass rounded-lg p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disease Catalog */}
      <section className="mb-12">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function DetectionSkeleton() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-8 animate-pulse">
      {/* Hero */}
      <section className="pb-8 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-8 w-32 mx-auto rounded-full" />
          <Skeleton className="h-10 w-80 mx-auto" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
      </section>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
