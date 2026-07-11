import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        brand: {
          primary: {
            DEFAULT: "color-mix(in srgb, var(--brand-primary), transparent calc(100% * (1 - <alpha-value>)))",
            dark: "color-mix(in srgb, var(--brand-primary-dark), transparent calc(100% * (1 - <alpha-value>)))",
            gradEnd: "color-mix(in srgb, var(--brand-primary-grad-end), transparent calc(100% * (1 - <alpha-value>)))",
            gradEndDark: "color-mix(in srgb, var(--brand-primary-grad-end-dark), transparent calc(100% * (1 - <alpha-value>)))",
            gradAlt: "color-mix(in srgb, var(--brand-primary-grad-alt), transparent calc(100% * (1 - <alpha-value>)))",
          },
          secondary: {
            DEFAULT: "color-mix(in srgb, var(--brand-secondary), transparent calc(100% * (1 - <alpha-value>)))",
            hover: "color-mix(in srgb, var(--brand-secondary-hover), transparent calc(100% * (1 - <alpha-value>)))",
          },
          accent: "color-mix(in srgb, var(--brand-accent), transparent calc(100% * (1 - <alpha-value>)))",
          destructive: "color-mix(in srgb, var(--brand-destructive), transparent calc(100% * (1 - <alpha-value>)))",
          neutralLight: "color-mix(in srgb, var(--brand-neutral-light), transparent calc(100% * (1 - <alpha-value>)))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        cairo: ["var(--font-cairo)"],
        museo: ["var(--font-museo)"],
        montserrat: ["var(--font-montserrat)"],
        roboto: ["var(--font-roboto)"],
        geDiner: ["var(--font-ge-diner)"],
        vexa: ["var(--font-vexa)"],
        dgRarah: ["var(--font-dgrarah)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
