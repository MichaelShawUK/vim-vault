import Moon from '@/SVG/Moon';
import Sun from '@/SVG/Sun';
import { useContext } from 'react';
import ThemeContext from '@/Context/ThemeContext';

interface Props {
    toggle: () => void;
}

export default function ThemeSwitch({ toggle }: Props) {
    const theme = useContext(ThemeContext);

    return (
        <button
            onClick={toggle}
            className="ml-auto text-gray-700 dark:text-gray-100 p-1">
            {theme === 'dark' && <Sun />}
            {theme === 'light' && <Moon />}
        </button>
    );
}
