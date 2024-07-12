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
            <header className="flex justify-between items-center px-3 gap-4 py-2">
                <Link href="/">
                    <Logo />
                </Link>
                <Search />
                <ThemeSwitch
                    isDark={darkTheme}
                    toggle={toggleTheme}
                />
            </header>
            {children}
        </div>
    );
}
