import { Loader2 } from "lucide-react";
import React from "react";

const LoadingSpinner = ({ size = 60, text = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="p-8 flex flex-col items-center">
        <div className="p-4 rounded-full mb-4 shadow-xl bg-yellow-500">
          <Loader2 className="animate-spin text-white w-10 h-10" />
        </div>
        <span className="text-lg font-bold text-yellow-600">{text}</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
