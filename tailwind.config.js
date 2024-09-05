import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                fade: {
                    '0%, 100%': { opacity: 0 },
                    '40%, 70%': { opacity: 1 },
                },
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translate(0, -20px)' },
                    '80%': { opacity: 0.2 },
                    '100%': { opacity: 1, transform: 'translate(0, 0)' },
                },
            },
            animation: {
                fade: 'fade 1s ease-out',
                fadeIn: 'fadeIn 0.2s ease-in',
            },
        },
    },

    plugins: [forms],
    darkMode: 'selector',
};
