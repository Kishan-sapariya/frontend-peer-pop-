export const formatDate = (date) => {
  if (typeof date !== "string" || !date.includes("T")) {
    return "";
  }

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return dateObj.toLocaleString(undefined, options);
};

export const getInitialLetter = (name) => {
  const letters = name?.charAt(0);
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
