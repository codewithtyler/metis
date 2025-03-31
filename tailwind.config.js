/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-hover': 'rgb(var(--color-primary-hover) / <alpha-value>)',
        dark: {
          50: 'rgb(var(--color-dark-50) / <alpha-value>)',
          100: 'rgb(var(--color-dark-100) / <alpha-value>)',
          200: 'rgb(var(--color-dark-200) / <alpha-value>)',
          300: 'rgb(var(--color-dark-300) / <alpha-value>)',
          400: 'rgb(var(--color-dark-400) / <alpha-value>)',
          500: 'rgb(var(--color-dark-500) / <alpha-value>)',
          600: 'rgb(var(--color-dark-600) / <alpha-value>)',
          700: 'rgb(var(--color-dark-700) / <alpha-value>)',
          800: 'rgb(var(--color-dark-800) / <alpha-value>)',
          900: 'rgb(var(--color-dark-900) / <alpha-value>)',
          950: 'rgb(var(--color-dark-950) / <alpha-value>)',
        },
        error: 'rgb(var(--color-error) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
