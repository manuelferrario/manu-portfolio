import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        city: {
          bgStart: "#ff8f3f",
          bgMid: "#ff4f7d",
          bgEnd: "#5f57ff",
          card: "rgba(255, 255, 255, 0.14)",
          line: "rgba(255, 255, 255, 0.35)"
        }
      },
      boxShadow: {
        glow: "0 0 0 2px rgba(255,255,255,0.35), 0 20px 50px rgba(8, 7, 24, 0.25)"
      },
      backdropBlur: {
        xs: "2px"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
};

export default config;
