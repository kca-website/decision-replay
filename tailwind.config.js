/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        app: '#FAF7F0',
        card: '#FFFFFF',
        subtle: '#F3EEE3',
        'border-strong': '#CBBFA9',
        ink: {
          DEFAULT: '#2A2621',
          muted: '#6B6357',
          subtle: '#948A7D',
        },
        accent: {
          DEFAULT: '#B25A3C',
          hover: '#9C4E33',
          soft: '#F2E1D6',
        },
        success: '#6E8E4C',
        warning: '#C88A3D',
        danger: '#B54A3D',
      },
      borderColor: {
        DEFAULT: '#E7DFD1',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        md: '10px',
        lg: '14px',
        xl: '20px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(74, 60, 45, 0.05)',
        sm: '0 2px 4px rgba(74, 60, 45, 0.06), 0 1px 2px rgba(74, 60, 45, 0.04)',
        md: '0 4px 12px rgba(74, 60, 45, 0.08), 0 2px 4px rgba(74, 60, 45, 0.04)',
        lg: '0 12px 24px rgba(74, 60, 45, 0.10), 0 4px 8px rgba(74, 60, 45, 0.05)',
      },
    },
  },
  plugins: [],
};
