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
        primary: "#2C4033",
        "primary-light": "#EAF3DE",
        cta: "#2C4033",
        "cta-light": "#EAF3DE",
        page: "#FDFBF7",
        card: "#FFFFFF",
        body: "#121212",
        secondary: "#525252",
        paper: "#F3F1EC",
        line: "#E4DFD8",
        rust: "#C85A32",
        error: "#B42318"
      },
      borderRadius: {
        card: "8px"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(44, 64, 51, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
