export const formatDate = (date) => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return "";
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return dateObj.toLocaleDateString(undefined, options);
};

export const getInitialLetter = (name) => {
  const letters = name?.charAt(0).toUpperCase();
  return letters;
};

export const capitalizeInitials = (name) => {
  if (typeof name !== "string" || name.trim() === "") {
    return "";
  }
  const words = name.split(" ");
  const capitalizedWords = words.map((word) => {
    if (word.length === 0) {
      return "";
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizedWords.join(" ");
};

export const formatNumber = (num) => {
  const number = Number(num) || 0;
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  } else if (number >= 1000) {
    return `${(number / 1000).toFixed(0)}K`;
  }
  return number.toString();
};

export const formatTimeAgo = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  // Handle future dates
  if (seconds < 0) return "just now";

  // Less than a minute
  if (seconds < 60) return "just now";

  // Minutes
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  // Hours
  const hours = Math.floor(seconds / 3600);
  if (hours < 24) return `${hours}h ago`;

  // Days
  const days = Math.floor(seconds / 86400);
  if (days < 7) return `${days}d ago`;

  // Weeks
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;

  // Months
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  // Years
  const years = Math.floor(days / 365);
  return `${years}y ago`;
};

export const getCategoryLabel = (category) => {
  switch (category?.toUpperCase()) {
    case "COLLABORATION":
      return {
        label: "Seeking Collab",
        className: "bg-teal-500 text-white",
      };
    case "OPPORTUNITY":
      return {
        label: "Opportunity Post",
        className: "bg-[#F0AF1B]  text-white",
      };
    case "SHOWCASE":
      return {
        label: "Projects",
        className: "bg-red-500  text-white",
      };
    default:
      return {
        label: "General Post",
        className: "hidden",
      };
  }
};
export const getCompletionCateogryStyle = (category) => {
  switch (category) {
    case "Elite":
      return {
        className: "bg-gradient-to-r from-blue-400 to-sky-400 text-white",
      };
    case "Rising":
      return {
        className: "bg-red-500 text-white",
      };
    case "Pro":
      return {
        className: "bg-gradient-to-r from-emerald-400 to-teal-500 text-white",
      };
  }
};

export function monthsToRange(months) {
  if (months == null) return "";
  const m = typeof months === "string" ? parseInt(months, 10) : months;
  if (Number.isNaN(m)) return "";
  if (m < 0) return "";

  if (m <= 6) return "0-6months";
  if (m <= 12) return "6months-1year";
  if (m <= 24) return "1-2years";
  if (m <= 60) return "2-5years";
  return "5+years";
}
