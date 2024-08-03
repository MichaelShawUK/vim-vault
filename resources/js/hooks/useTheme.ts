import { useEffect, useState } from "react";

export default function useTheme(defaultTheme: 'dark' | 'light' = 'dark') {
    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        const savedTheme = localStorage.getItem('theme');

        return savedTheme == 'dark' || savedTheme == 'light' ? savedTheme : defaultTheme
    })

    function toggleTheme() {
        setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'));
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme])

    return {theme, toggleTheme}
}
