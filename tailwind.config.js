export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#1D4ED8', // Primary: Royal Blue
        },
        green: {
          500: '#10B981', // Secondary: Emerald Green
        },
        amber: {
          500: '#FBBF24', // Accent: Gold
        },
        gray: {
          500: '#6B7280', // Neutral: Slate Gray
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}