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
            },
            animation: {
                fade: 'fade 1s ease-out',
            },
        },
    },

    plugins: [forms],
    darkMode: 'selector',
};
