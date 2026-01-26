"use client";

const WarningIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default function NoChannelPage() {
  const BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

  const tryAnotherAccount = () => {
    window.location.href = `${BASE}/youtube/auth?select=1`;
  };

  const backToOnboarding = () => {
    window.location.href = `/onboarding/youtuber`;
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center bg-gray-50 p-4">
      <div className="mx-auto max-w-md w-full p-8 text-center rounded-2xl border bg-white shadow-lg transition-all duration-300 transform">
        <WarningIcon className="w-12 h-12 mx-auto text-yellow-500 mb-6" />

        <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
          Channel Missing 😟
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          The Google account you connected doesn't appear to have an active
          YouTube channel associated with it. Please check the account you
          selected.
        </p>

        <div className="space-y-4">
          <button
            onClick={tryAnotherAccount}
            className="w-full rounded-xl bg-yellow-600 text-white px-6 py-3 font-semibold text-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition duration-150 ease-in-out"
          >
            Try a Different Google Account
          </button>

          {/* Secondary Action Button */}
          <button
            onClick={backToOnboarding}
            className="w-full rounded-xl border border-gray-300 text-gray-700 bg-gray-50 px-6 py-3 font-medium text-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 transition duration-150 ease-in-out"
          >
            Back to Onboarding
          </button>
        </div>
      </div>
    </div>
  );
}
