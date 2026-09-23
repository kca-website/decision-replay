/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        app: '#F6F8FF',
        card: '#FFFFFF',
        subtle: '#EEF2FF',
        'border-strong': '#C8D2F2',
        ink: {
          DEFAULT: '#17233C',
          muted: '#52617A',
          subtle: '#7F8CA3',
        },
        accent: {
          DEFAULT: '#635BFF',
          hover: '#5148E8',
          soft: '#EAE8FF',
        },
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      borderColor: {
        DEFAULT: '#DCE3F7',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        DEFAULT: '14px',
        md: '14px',
        lg: '18px',
        xl: '24px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(54, 69, 120, 0.05)',
        sm: '0 4px 12px rgba(54, 69, 120, 0.08)',
        md: '0 10px 24px rgba(54, 69, 120, 0.10)',
        lg: '0 18px 44px rgba(54, 69, 120, 0.14)',
      },
    },
  },
  plugins: [],
};
