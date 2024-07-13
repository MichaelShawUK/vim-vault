import Search from '@/Components/Search';
import ThemeSwitch from '@/Components/ThemeSwitch';
import Logo from '@/SVG/Logo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';

export default function Layout({ children }: PropsWithChildren) {
    const [darkTheme, setDarkTheme] = useState(true);
    const toggleTheme = () => setDarkTheme((p) => !p);
    return (
        <div
            className={`min-h-screen ${darkTheme ? 'dark' : ''} bg-gray-50 dark:bg-gray-900 dark:text-white`}>
            <header className="max-w-6xl mx-auto grid grid-cols-2 items-center px-3 gap-4 py-2">
                <Link
                    href="/"
                    className="w-fit">
                    <Logo />
                </Link>
                <ThemeSwitch
                    isDark={darkTheme}
                    toggle={toggleTheme}
                />
                <Search />
            </header>
            {children}
        </div>
    );
}
