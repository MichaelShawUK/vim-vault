import HeaderActions from '@/Components/HeaderActions';
import Search from '@/Components/Search';
import ThemeSwitch from '@/Components/ThemeSwitch';
import { AuthenticatedUserContext } from '@/Context/AuthenticatedUserContext';
import {
    PluginsContext,
    PluginsDispatchContext,
} from '@/Context/PluginsContext';
import ThemeContext from '@/Context/ThemeContext';
import useTheme from '@/hooks/useTheme';
import Icon from '@/SVG/Icon';
import { pluginAction, SavablePlugin, SearchData, User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface Props {
    title: string;
    auth: {
        user: User | null;
        saved: number[];
    };
    plugins: SavablePlugin[];
    dispatch: React.Dispatch<pluginAction>;
    searchData?: SearchData;
}

const initialSearchData: SearchData = {
    query: '',
    searchName: true,
    searchTag: true,
    searchDescription: true,
    searchOwner: true,
};

export default function SiteLayout({
    children,
    title,
    auth,
    plugins,
    dispatch,
    searchData,
}: PropsWithChildren<Props>) {
    const { theme, toggleTheme } = useTheme();
    return (
        <PluginsDispatchContext.Provider value={dispatch}>
            <AuthenticatedUserContext.Provider value={auth.user}>
                <ThemeContext.Provider value={theme}>
                    <PluginsContext.Provider value={plugins}>
                        <div
                            className={`min-h-screen ${theme} transition-colors duration-500 bg-white dark:bg-gray-900 dark:text-white selection:bg-yellow-400 selection:text-black`}
                        >
                            <Head title={title} />
                            <header className="max-w-6xl mx-auto px-8 pt-7">
                                <div className="flex items-center justify-between mb-8">
                                    <Link
                                        href="/"
                                        className="w-fit"
                                    >
                                        <Icon />
                                    </Link>
                                    <div className="flex items-center gap-x-4 divide-gray-200 dark:divide-gray-700 divide-x-2">
                                        <ThemeSwitch toggle={toggleTheme} />
                                        <HeaderActions user={auth.user} />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Search
                                        searchData={
                                            searchData || initialSearchData
                                        }
                                    />
                                </div>
                            </header>

                            <main className="max-w-4xl mx-auto text-center sm:px-4 ">
                                {children}
                            </main>
                        </div>
                    </PluginsContext.Provider>
                </ThemeContext.Provider>
            </AuthenticatedUserContext.Provider>
        </PluginsDispatchContext.Provider>
    );
}
