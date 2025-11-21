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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				// Headers - Bold & Impactful
				'bebas': ['Bebas Neue', 'Arial', 'sans-serif'],
				'anton': ['Anton', 'Arial', 'sans-serif'],
				'spartan': ['League Spartan', 'Arial', 'sans-serif'],
				
				// Digital Body - Clean & Modern
				'inter': ['Inter', 'system-ui', 'sans-serif'],
				
				// Narrative - Elegant & Traditional
				'merriweather': ['Merriweather', 'Georgia', 'serif'],
				'playfair': ['Playfair Display', 'Georgia', 'serif'],
				'georgia': ['Georgia', 'serif'],
				
				// Semantic aliases for easier usage
				'heading': ['Bebas Neue', 'Anton', 'League Spartan', 'Arial', 'sans-serif'],
				'body': ['Inter', 'system-ui', 'sans-serif'],
				'narrative': ['Merriweather', 'Playfair Display', 'Georgia', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					light: 'hsl(var(--primary-light))',
					glow: 'hsl(var(--primary-glow))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				golden: {
					DEFAULT: 'hsl(var(--golden))',
					light: 'hsl(var(--golden-light))',
					dark: 'hsl(var(--golden-dark))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					accent: 'hsl(var(--card-accent))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'curtain-rise': {
					'0%': { transform: 'translateY(0%)', opacity: '1' },
					'100%': { transform: 'translateY(-100%)', opacity: '0' }
				},
				'spotlight-fade': {
					'0%': { opacity: '0', transform: 'scale(0.8)' },
					'50%': { opacity: '0.8', transform: 'scale(1.1)' },
					'100%': { opacity: '0.6', transform: 'scale(1)' }
				},
				'ticket-float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'golden-shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'theatre-entrance': {
					'0%': { opacity: '0', transform: 'translateY(50px) scale(0.9)' },
					'100%': { opacity: '1', transform: 'translateY(0px) scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'curtain-rise': 'curtain-rise 2s ease-in-out',
				'spotlight-fade': 'spotlight-fade 3s ease-in-out infinite',
				'ticket-float': 'ticket-float 3s ease-in-out infinite',
				'golden-shimmer': 'golden-shimmer 2s ease-in-out infinite',
				'theatre-entrance': 'theatre-entrance 0.8s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
