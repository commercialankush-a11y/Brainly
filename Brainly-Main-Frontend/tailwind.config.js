/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        gray:{
          50: "rgba(255,255,255,0.5)",
          200:"#7071aa",
          300:"#eeeeee"
        },
        purple:{
          600:"#7071aa",
          200:"#7071aa",
          500:"#7071aa"
        }
      }
    },
  },
  plugins: [],
}

