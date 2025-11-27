import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RouteLoadingSkeleton() {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-6 w-40 mx-auto mb-4" />
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <div className="flex items-center justify-center gap-6">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>

        {/* Content grid skeleton */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-8">
            {/* Emotional journey card */}
            <Card className="rounded-2xl border-2">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>

            {/* Expected benefit card */}
            <Card className="rounded-2xl border-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-14 h-14 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Waypoints skeleton */}
            <div>
              <Skeleton className="h-6 w-48 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative pl-8">
                    <Skeleton className="absolute left-0 top-4 w-8 h-8 rounded-full" />
                    <Card className="ml-6 rounded-xl border-2">
                      <CardContent className="p-6 space-y-3">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-10 h-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Map skeleton */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Skeleton className="w-full h-[400px] md:h-[600px] rounded-xl" />
            <Skeleton className="h-4 w-40 mx-auto mt-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
