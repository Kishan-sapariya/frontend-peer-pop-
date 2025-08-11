import { Loader2 } from "lucide-react";
import React from "react";

const LoadingSpinner = ({ size = 60, text = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="p-8 flex flex-col items-center">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg mb-4">
            <Loader2
              className="animate-spin text-white"
              style={{ width: size, height: size }}
            />
          </div>
          <span className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
