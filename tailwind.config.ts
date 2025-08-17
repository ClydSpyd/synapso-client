import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      keyframes: {
        pulseOnce: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "pulse-once": "pulseOnce 0.5s ease-in-out 1",
      },
    },
  },
} satisfies Config;

export default config;
