import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface OptimizedImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
  width?: number | string;
  height?: number | string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className = "", fetchPriority, width, height, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-white/5 ${className}`}>
      {/* Placeholder flou (blur-up effect) */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-white/10 animate-pulse"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      {/* Image réelle */}
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={fetchPriority === "high" ? "eager" : "lazy"}
        fetchPriority={fetchPriority}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
};
