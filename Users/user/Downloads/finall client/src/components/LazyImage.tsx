import { useState, useEffect, useRef, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  skeletonClassName?: string;
  fallbackSrc?: string;
}

export function LazyImage({
  src,
  alt = "",
  className,
  skeletonClassName,
  fallbackSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23E9E9EC'/%3E%3C/svg%3E",
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            imgRef.current.src = src || "";
            observer.unobserve(imgRef.current);
          }
        });
      },
      { rootMargin: "100px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => {
    setError(true);
    setLoaded(true);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!loaded && (
        <Skeleton className={cn("absolute inset-0 rounded-button", skeletonClassName)} />
      )}
      <img
        ref={imgRef}
        alt={alt}
        data-src={src}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
        src={error ? fallbackSrc : undefined}
      />
    </div>
  );
}
