/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', 'system-ui', 'sans-serif'],
            },
            colors: {
                accent: {
                    DEFAULT: 'rgb(79 70 229)',
                    light: 'rgb(99 102 241)',
                    dark: 'rgb(129 140 248)',
                },
            },
        },
    },
    plugins: [],
};
