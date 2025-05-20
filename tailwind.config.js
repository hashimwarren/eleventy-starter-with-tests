/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{liquid,html,js,ts,md}",
    "./src/_includes/**/*.{liquid,html,js,ts}",
  ],
  // Force critical classes to be included even if Tailwind's purge doesn't detect them
  safelist: [
    // Layout & Containers
    "container",
    "mx-auto",
    "p-4",
    "flex",
    "flex-col",
    "flex-grow",
    "justify-between",
    "items-center",
    "min-h-screen",

    // Typography
    "font-sans",
    "text-white",
    "text-blue-600",
    "text-gray-500",
    "font-bold",
    "font-semibold",
    "text-sm",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",

    // Colors & Backgrounds
    "bg-gray-800",

    // Spacing & Positioning
    "mt-2",
    "mt-4",
    "mt-8",
    "mb-4",
    "mb-6",
    "mr-4",
    "ml-5",

    // Interactive
    "hover:underline",

    // Lists
    "list-disc",
  ],
};
