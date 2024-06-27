/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    extend: {},
  },
  
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

