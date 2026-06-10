import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#185FA5",
        "primary-light": "#E6F1FB",
        cta: "#1A6B3A",
        "cta-light": "#EAF3DE",
        page: "#F5F7FA",
        card: "#FFFFFF",
        body: "#222222",
        secondary: "#666666",
        error: "#B42318"
      },
      borderRadius: {
        card: "8px"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(24, 95, 165, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
