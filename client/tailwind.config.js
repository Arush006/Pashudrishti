module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'dark-blue': '#1e40af',
        'light-bg': '#f3f4f6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundColor: {
        'gradient': 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      }
    },
  },
  plugins: [],
}
