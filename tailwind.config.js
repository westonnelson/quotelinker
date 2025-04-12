/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6fffe',
          100: '#ccfefd',
          200: '#99fdfb',
          300: '#66fcf9',
          400: '#33fbf7',
          500: '#00f7ff', // Neon teal brand color
          600: '#00c6cc',
          700: '#009499',
          800: '#006366',
          900: '#003233',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary.500), 0 0 20px theme(colors.primary.500)',
        'neon-lg': '0 0 10px theme(colors.primary.500), 0 0 30px theme(colors.primary.500)',
      },
    },
  },
  plugins: [],
} 