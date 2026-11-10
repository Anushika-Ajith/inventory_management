/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./inventory_management_ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        odin: {
          navy: '#162a69',
          blue: '#2563eb',
        },
      },
    },
  },
  plugins: [],
};
