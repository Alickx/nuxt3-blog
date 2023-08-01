/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/ui')],
  corePlugins: {
    preflight: false
  }
}
