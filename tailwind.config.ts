import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        petrol: '#1E3A4C',
        sand: '#D4A574',
        sage: '#7A9B8E',
        anthracite: '#1A1D29',
        cream: '#FAFAF9',
        paper: '#F5F4F2',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #1A1D29 0%, #1E3A4C 100%)',
      }
    },
  },
  plugins: [],
};

export default config;
