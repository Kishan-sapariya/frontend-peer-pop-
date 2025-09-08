import { Lock } from "lucide-react";
import React from "react";

const PrivateAccountUI = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-6 py-12 text-center rounded-2xl bg-gray-50 border border-gray-200 shadow-md mb-10">
      <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 shadow-md">
        <Lock className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mt-2">
        This account is private
      </h3>
      <p className="text-sm text-gray-500 max-w-xs">
        Connect with this user to view their full profile and details.
      </p>
    </div>
  );
};

export default PrivateAccountUI;
