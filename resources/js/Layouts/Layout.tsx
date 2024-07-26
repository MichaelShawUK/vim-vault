import Search from '@/Components/Search';
import ThemeSwitch from '@/Components/ThemeSwitch';
import Logo from '@/SVG/Logo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import ThemeContext from '@/Context/ThemeContext';

export default function Layout({ children }: PropsWithChildren) {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const toggleTheme = () =>
        setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'));

    return (
        <ThemeContext.Provider value={theme}>
            <div
                className={`min-h-screen ${theme} transition-colors duration-500 bg-gray-50 dark:bg-gray-900 dark:text-white selection:bg-yellow-400 selection:text-black`}>
                <header className="max-w-6xl mx-auto grid grid-cols-2 items-center px-3 gap-4 pt-2 mb-14 sm:mb-20">
                    <Link
                        href="/"
                        className="w-fit">
                        <Logo />
                    </Link>
                    <ThemeSwitch toggle={toggleTheme} />
                    <Search />
                </header>

                <main className="max-w-4xl mx-auto text-center sm:px-4 ">
                    {children}
                </main>
            </div>
        </ThemeContext.Provider>
    );
}
