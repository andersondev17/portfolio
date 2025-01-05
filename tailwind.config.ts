import type { Config } from "tailwindcss";

const svgToDataUri = require("mini-svg-data-uri");

const colors = require("tailwindcss/colors");
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./data/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
				hd: '1280px',   // HD
				fhd: '1920px',  // Full HD
			}
		},
		extend: {
			fontFamily: {
				zentry: ['Zentry', 'sans-serif'],
				general: ['General', 'sans-serif'],
				'circular-web': ['circular-web', 'sans-serif'],
				'robert-regular': ['robert-regular', 'sans-serif'],
				'robert-medium': ['robert-medium', 'sans-serif'],
			},
			colors: {
				black: {
					'100': '#000319',
					'200': 'rgba(17, 25, 40, 0.75)',
					'300': 'rgba(255, 255, 255, 0.125)',
					DEFAULT: '#000'
				},
				white: {
					'100': '#BEC1DD',
					'200': '#C1C2D3',
					DEFAULT: '#FFF'
				},
				blue: {
					'100': '#E4ECFF'
				},
				purple: '#CBACF9',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
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
					foreground: 'hsl(var(--card-foreground))'
				},
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
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
				spotlight: {
					'0%': {
						opacity: '0',
						transform: 'translate(-72%, -62%) scale(0.5)'
					},
					'100%': {
						opacity: '1',
						transform: 'translate(-50%,-40%) scale(1)'
					}
				},
				shimmer: {
					from: {
						backgroundPosition: '0 0'
					},
					to: {
						backgroundPosition: '-200% 0'
					}
				},
				moveHorizontal: {
					'0%': {
						transform: 'translateX(-50%) translateY(-10%)'
					},
					'50%': {
						transform: 'translateX(50%) translateY(10%)'
					},
					'100%': {
						transform: 'translateX(-50%) translateY(-10%)'
					}
				},
				moveInCircle: {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'50%': {
						transform: 'rotate(180deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				moveVertical: {
					'0%': {
						transform: 'translateY(-50%)'
					},
					'50%': {
						transform: 'translateY(50%)'
					},
					'100%': {
						transform: 'translateY(-50%)'
					}
				},
				scroll: {
					to: {
						transform: 'translate(calc(-50% - 0.5rem))'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				spotlight: 'spotlight 2s ease .75s 1 forwards',
				shimmer: 'shimmer 2s linear infinite',
				first: 'moveVertical 30s ease infinite',
				second: 'moveInCircle 20s reverse infinite',
				third: 'moveInCircle 40s linear infinite',
				fourth: 'moveHorizontal 40s ease infinite',
				fifth: 'moveInCircle 20s ease infinite',
				scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite'
			},
			backgroundImage: {
				'gradient-radial-light': 'radial-gradient(ellipse at center, var(--gradient-from-light) 0%, var(--gradient-to-light) 70%)',
				'gradient-radial-dark': 'radial-gradient(ellipse at center, var(--gradient-from-dark) 0%, var(--gradient-to-dark) 70%)',
			},
		},
	},

	plugins: [
		addVariablesForColors,
		require("tailwindcss-animate"),
		function ({ addBase }: any) {
			addBase({
				':root': {
					'--gradient-from-light': 'rgba(99, 102, 241, 0.1)',
					'--gradient-to-light': 'transparent',
					'--gradient-from-dark': '#CBACF9',
					'--gradient-to-dark': 'transparent',
				}
			});
		},
	],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}

export default config;