/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hanok: {
          bg: '#FAF3E9',
          wood: '#7A4B32',
          terracotta: '#C1573A',
          gold: '#D4A64A',
          ink: '#3B2A20',
          tile: '#8C8577',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
