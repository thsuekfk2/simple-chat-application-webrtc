/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    bounce: {
      '0%, 100%': {
        transform: 'translateY(-55%)',
        'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
      },
      '50%': {
        transform: 'none',
        'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
      },
    },
    wiggle: {
      '0%, 100%': { transform: 'rotate(-3deg)' },
      '50%': { transform: 'rotate(3deg)' },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
      mainColor: '#a1b5d8',
      hoverColor: '#8f9db5',
      subColor: '#e4f0d0',
      baseColor: '#fffcf7',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
    plugins: [],
  },
};
