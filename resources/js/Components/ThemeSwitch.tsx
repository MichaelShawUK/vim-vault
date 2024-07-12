import Moon from '@/SVG/Moon';
import Sun from '@/SVG/Sun';

interface Props {
    isDark: boolean;
    toggle: () => void;
}

export default function ThemeSwitch({ isDark, toggle }: Props) {
    return (
        <button
            onClick={toggle}
            className="text-gray-700 dark:text-gray-100 p-1">
            {isDark && <Sun />}
            {!isDark && <Moon />}
        </button>
    );
}
