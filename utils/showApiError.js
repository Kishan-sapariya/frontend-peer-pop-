import toast from "react-hot-toast";

// Show a user-friendly error toast from an axios/API error.
//
// Rule: only surface the backend's message for EXPECTED client errors (4xx)
// and only when it isn't a technical/server string. For unexpected errors
// (5xx, network, no response, or a technical-looking body) show `fallback`.
// This stops raw "Internal server error" / Prisma strings from reaching users.
export function showApiError(
  error,
  fallback = "Something went wrong. Please try again."
) {
  // No response at all → network / server unreachable.
  if (error && error.request && !error.response) {
    toast.error("You appear to be offline. Check your connection and try again.");
    return;
  }

  const status = error?.response?.status;
  const msg = error?.response?.data?.message;
  const isClientError = status >= 400 && status < 500;
  const looksTechnical =
    !msg ||
    typeof msg !== "string" ||
    /internal server error|prisma|invocation|econn|timeout|is not a function|undefined/i.test(
      msg
    );

  toast.error(isClientError && !looksTechnical ? msg : fallback);
}

export default showApiError;
