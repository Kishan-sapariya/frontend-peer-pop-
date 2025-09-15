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
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "m ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return "now";
};

export const getCategoryLabel = (category) => {
  switch (category?.toUpperCase()) {
    case "COLLABORATION":
      return {
        label: "Seeking Collab",
        className: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
      };
    case "OPPORTUNITY":
      return {
        label: "Job/Gig Post",
        className: "bg-gradient-to-r from-blue-400 to-sky-400 text-white",
      };
    case "SHOWCASE":
      return {
        label: "Projects",
        className: "bg-gradient-to-r from-emerald-400 to-teal-500 text-white",
      };
    default:
      return {
        label: "General Post",
        className: "bg-gradient-to-r from-gray-300 to-gray-500 text-white",
      };
  }
};
export const getCompletionCateogryStyle = (category) => {
  switch (category) {
    case "Elite":
      return {
        className: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
      };
    case "Rising":
      return {
        label: "Job/Gig Post",
        className: "bg-gradient-to-r from-blue-400 to-sky-400 text-white",
      };
    case "Pro":
      return {
        label: "Projects",
        className: "bg-gradient-to-r from-emerald-400 to-teal-500 text-white",
      };
  }
};
