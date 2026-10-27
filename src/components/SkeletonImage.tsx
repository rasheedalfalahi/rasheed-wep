import React, { useState, useRef, useEffect } from 'react';

interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
}

export default function SkeletonImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  loading = 'lazy',
  decoding = 'async',
  ...props
}: SkeletonImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden w-full h-full ${containerClassName}`}>
      {/* Skeleton screen with architectural designer grid details */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#02161b] flex items-center justify-center overflow-hidden z-10 rounded-[inherit]">
          {/* Diagonal crop mark indicators */}
          <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-brand-primary/20" />
          <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-brand-primary/20" />
          <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-brand-primary/20" />
          <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-brand-primary/20" />
          
          {/* Center alignment thin crosshairs */}
          <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-white/[0.02]" />
          <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-white/[0.02]" />

          {/* Glowing brand mark */}
          <div className="w-14 h-14 rounded-2xl border border-brand-primary/10 flex items-center justify-center relative bg-[#04242c]/40 shadow-[inset_0_1px_8px_rgba(0,152,154,0.05),_0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="w-10 h-10 rounded-xl border border-brand-primary/25 flex items-center justify-center overflow-hidden p-1.5">
              <img 
                src="/images/projects/icon.png" 
                alt="Logo" 
                className="w-full h-full object-contain opacity-60"
                referrerPolicy="no-referrer"
                loading="eager"
              />
            </div>
          </div>

          {/* Radiant Shimmer Sweep */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skeleton-shine pointer-events-none" />
        </div>
      )}

      {/* Rich visual image element with fast crisp opacity release */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-300 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
}
