import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        OpenSans: ['OpenSans'],
        Oswald: ['Oswald'],
      },
      colors: {
        maroon: {
          DEFAULT: "rgb(var(--maroon))",
          90: "rgba(var(--maroon) 0.9)"
        }
      },
    },
  },
  daisyui: {
    themes: ['light'],
    // styled: false,
  },
  corePlugins: {
    fontWeight: false,
  },
  plugins: [require('./fontVariationSettingsPlugin'), require('daisyui')],
};
export default config;
