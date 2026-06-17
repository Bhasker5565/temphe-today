/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#522903',
          dark: '#3A1D01',
          light: '#7A3D04',
          faint: '#F5EDE5',
        },
        turmeric: {
          DEFAULT: '#E8A83E',
          light: '#F5D080',
          dark: '#C07820',
          faint: '#FDF6E3',
        },
        forest: {
          DEFAULT: '#2C4A1E',
          light: '#3D6828',
          dark: '#1A2E12',
          faint: '#EAF0E5',
        },
        cream: {
          DEFAULT: '#FBF5E8',
          warm: '#F5E8CC',
          deep: '#ECD9A8',
        },
        charcoal: '#1C0D04',
        sienna: '#C8956C',
        amber: {
          prod: '#E8A83E',
        },
      },
      fontFamily: {
        display: ['Zodiak', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 4px 24px rgba(82, 41, 3, 0.10)',
        'warm-lg': '0 8px 40px rgba(82, 41, 3, 0.16)',
        'warm-hover': '0 12px 48px rgba(82, 41, 3, 0.22)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #522903 0%, #7A3D04 100%)',
      },
    },
  },
  plugins: [],
}
