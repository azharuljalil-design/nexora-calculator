import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#06B6D4",
        accent: "#F59E0B",
        background: "#F8FAFC",
        text: "#0F172A"
      }
    }
  },
  plugins: []
};

export default config;

