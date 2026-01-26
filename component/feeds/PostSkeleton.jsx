import React from "react";

const PostSkeleton = () => {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse bg-white/90 backdrop-blur-md"
        >
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3 mt-2"></div>
            </div>
          </div>
          <div className="h-28 bg-gray-200 rounded-lg"></div>
          <div className="mt-6 flex space-x-3">
            <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostSkeleton;
