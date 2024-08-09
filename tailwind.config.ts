// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Lobster', 'cursive'],
      },
      colors: {
        'bg': 'rgb(var(--color-bg))',
        'card-bg': 'rgb(var(--color-card-bg))',
        'text': 'rgb(var(--color-text))',
        'border': 'rgb(var(--color-border))',
        'placeholder': 'rgb(var(--color-placeholder))',
        'accent': 'rgb(var(--color-accent))',
        'button': 'rgb(var(--color-button))',
        // Add gray and red colors
        'gray-100': 'rgb(var(--color-gray-100))',
        'gray-500': 'rgb(var(--color-gray-500))',
        'gray-700': 'rgb(var(--color-gray-700))',
        'red-100': 'rgb(var(--color-red-100))',
        'red-500': 'rgb(var(--color-red-500))',
        'red-700': 'rgb(var(--color-red-700))',
      },
    },
  },
  plugins: [],
}
