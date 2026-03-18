/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f9ff',
          100: '#f0f3ff',
          500: '#667eea',
          600: '#5568d3',
          700: '#764ba2',
        },
        secondary: {
          500: '#3498db',
        },
        danger: {
          500: '#f5576c',
          600: '#e74c3c',
        },
        success: {
          500: '#27ae60',
        },
        warning: {
          500: '#f39c12',
        },
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-danger': 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
        'gradient-success': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'gradient-header': 'linear-gradient(90deg, #2c3e50 0%, #34495e 100%)',
      },
      boxShadow: {
        'soft': '0 8px 20px rgba(0, 0, 0, 0.1)',
        'medium': '0 12px 28px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
