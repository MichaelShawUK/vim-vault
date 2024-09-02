import Search from '@/Components/Search';
import ThemeSwitch from '@/Components/ThemeSwitch';
import Logo from '@/SVG/Logo';
import { Link, Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import ThemeContext from '@/Context/ThemeContext';
import AuthenticatedUserContext from '@/Context/AuthenticatedUserContext';
import useTheme from '@/hooks/useTheme';
import HeaderActions from '@/Components/HeaderActions';
import { User } from '@/types';

interface Props {
    title?: string;
    user: User;
}

export default function Layout({
    children,
    title,
    user,
}: PropsWithChildren<Props>) {
    const { theme, toggleTheme } = useTheme();

    return (
        <ThemeContext.Provider value={theme}>
            <AuthenticatedUserContext.Provider value={user}>
                <div
                    className={`min-h-screen ${theme} transition-colors duration-500 bg-white dark:bg-gray-900 dark:text-white selection:bg-yellow-400 selection:text-black`}
                >
                    <Head title={title} />
                    <header className="max-w-6xl mx-auto px-3 pt-7 mb-14 sm:mb-20">
                        <div className="flex items-center justify-between mb-8">
                            <Link
                                href="/"
                                className="w-fit"
                            >
                                <Logo />
                            </Link>
                            <div className="flex items-center gap-x-4 divide-gray-200 dark:divide-gray-700 divide-x-2">
                                <ThemeSwitch toggle={toggleTheme} />
                                <HeaderActions user={user} />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Search />
                        </div>
                    </header>

                    <main className="max-w-4xl mx-auto text-center sm:px-4 ">
                        {children}
                    </main>
                </div>
            </AuthenticatedUserContext.Provider>
        </ThemeContext.Provider>
    );
}
