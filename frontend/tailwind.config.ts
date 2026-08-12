import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: "#4B6B4F",
          light: "#6B8A6F",
          dark: "#3A5540",
        },
        sandstone: {
          DEFAULT: "#F1E9DD",
          light: "#F8F3EA",
          dark: "#E5D9C6",
        },
        terracotta: {
          DEFAULT: "#B5602E",
          light: "#C97A4A",
          dark: "#8F4A22",
        },
        gold: {
          DEFAULT: "#C9A961",
          light: "#DABF87",
          dark: "#A98A47",
        },
        charcoal: {
          DEFAULT: "#2E2B24",
          light: "#4A463C",
        },
        brown: {
          DEFAULT: "#5A3A22",
          light: "#7A5236",
          dark: "#432A18",
        },
        success: "#3F6659",
        error: "#A63B4F",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
