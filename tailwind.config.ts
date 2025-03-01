
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ["Inter", "SF Pro Display", "system-ui", "sans-serif"],
				display: ["SF Pro Display", "Inter", "system-ui", "sans-serif"],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))"
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))"
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))"
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))"
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))"
				},
				assist: {
					blue: "#0066cc",
					"light-blue": "#4a9fff",
					gray: "#f5f5f7",
					"dark-gray": "#333333",
					"light-gray": "#f9f9f9",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))"
				},
				// Additional playful colors
				soft: {
					green: "#F2FCE2",
					yellow: "#FEF7CD",
					orange: "#FEC6A1",
					purple: "#E5DEFF",
					pink: "#FFDEE2",
					peach: "#FDE1D3",
					blue: "#D3E4FD",
					gray: "#F1F0FB",
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				"fade-out": {
					"0%": { opacity: "1", transform: "translateY(0)" },
					"100%": { opacity: "0", transform: "translateY(10px)" }
				},
				"slide-in": {
					"0%": { transform: "translateX(-20px)", opacity: "0" },
					"100%": { transform: "translateX(0)", opacity: "1" }
				},
				"slide-up": {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" }
				},
				"scale-in": {
					"0%": { transform: "scale(0.95)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" }
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" }
				},
				pulse: {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.8" }
				},
				ping: {
					"75%, 100%": { transform: "scale(2)", opacity: "0" }
				},
				bounce: {
					"0%, 100%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)" },
					"50%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" }
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out forwards",
				"fade-out": "fade-out 0.5s ease-out forwards",
				"slide-in": "slide-in 0.6s ease-out forwards",
				"slide-up": "slide-up 0.5s ease-out forwards",
				"scale-in": "scale-in 0.5s ease-out forwards",
				"float": "float 6s ease-in-out infinite",
				"pulse": "pulse 3s ease-in-out infinite",
				"ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
				"bounce": "bounce 1s infinite"
			},
			transitionProperty: {
				"height": "height",
				"spacing": "margin, padding",
			},
			transitionTimingFunction: {
				"bounce-start": "cubic-bezier(0.5, 0, 0.75, 0)",
				"bounce-end": "cubic-bezier(0.25, 1, 0.5, 1)",
			},
			boxShadow: {
				'soft': '0 10px 25px -3px rgba(0, 0, 0, 0.05)',
				'card': '0 2px 8px rgba(0, 0, 0, 0.05)',
				'elevation': '0 4px 25px rgba(0, 0, 0, 0.05)',
			},
			backdropBlur: {
				xs: '2px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
