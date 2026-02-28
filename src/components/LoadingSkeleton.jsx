// components/LoadingSkeleton.jsx
import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-void-black">
      {/* Hero Skeleton */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="skeleton w-32 h-8 mx-auto mb-8 rounded-full" />

          {/* Title */}
          <div className="skeleton w-full max-w-2xl h-24 mx-auto mb-6 rounded-2xl" />

          {/* Subtitle */}
          <div className="skeleton w-64 h-6 mx-auto mb-12 rounded-lg" />

          {/* Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton w-36 h-12 rounded-full" />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mb-16">
            <div className="skeleton w-40 h-14 rounded-full" />
            <div className="skeleton w-40 h-14 rounded-full" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton h-32 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}