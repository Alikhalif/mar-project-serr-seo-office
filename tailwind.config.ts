import type { Config } from 'tailwindcss'

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
        colors: {
            primary: {
            50: '#fef2f2',
            600: '#dc2626',
            700: '#b91c1c',
            800: '#991b1b',
            }
        },
        animation: {
            'fade-in-up': 'fadeInUp 1s ease-out',
            'pulse-slow': 'pulse 2s ease-in-out infinite',
            'bounce-slow': 'bounce 2s ease-in-out infinite',
        },
        },
    },
    plugins: [],
} satisfies Config