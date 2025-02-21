/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                brown: {
                    100: "#f5e5d8",
                    200: "#e5c4a1",
                    300: "#d4a47c",
                    400: "#b07d5b",
                    500: "#8d5a3b",
                    600: "#6e4127",
                    700: "#4f2a18",
                    800: "#33180b",
                    900: "#1a0a04",
                },
            },
        },
    },
    plugins: [daisyui],
};
