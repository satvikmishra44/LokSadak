import React from "react";

const alertStyles = {
  success: {
    bg: "bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800",
    border: "border-green-500 dark:border-green-700",
    text: "text-green-900 dark:text-green-100",
    icon: "text-green-600"
  },
  info: {
    bg: "bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800",
    border: "border-blue-500 dark:border-blue-700",
    text: "text-blue-900 dark:text-blue-100",
    icon: "text-blue-600"
  },
  warning: {
    bg: "bg-yellow-100 dark:bg-yellow-900 hover:bg-yellow-200 dark:hover:bg-yellow-800",
    border: "border-yellow-500 dark:border-yellow-700",
    text: "text-yellow-900 dark:text-yellow-100",
    icon: "text-yellow-600"
  },
  error: {
    bg: "bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800",
    border: "border-red-500 dark:border-red-700",
    text: "text-red-900 dark:text-red-100",
    icon: "text-red-600"
  }
};

export default function Alert({ type = "info", message }) {
  const style = alertStyles[type] || alertStyles.info;

  return (
    <div
      role="alert"
      className={`${style.bg} border-l-4 ${style.border} ${style.text} p-2 rounded-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105 w-full h-[10vh] text-2xl`}
    >
      <svg
        stroke="currentColor"
        viewBox="0 0 24 24"
        fill="none"
        className={`h-5 w-5 flex-shrink-0 mr-2 ${style.icon}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>
      <p className="text-xs font-semibold">{message}</p>
    </div>
  );
}
