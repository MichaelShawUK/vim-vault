interface Props {
    label: string;
    checked: boolean;
    toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchDomainCheckbox({
    label,
    checked,
    toggle,
}: Props) {
    return (
        <li>
            <label
                htmlFor={`${label.toLowerCase()}`}
                className={`text-xs cursor-pointer font-bold uppercase py-1 px-1 rounded ring-inset dark:ring-white/20 ring-gray-400 hover:ring-1 ${checked ? 'bg-gradient-to-br from-blue-700 to-green-600 text-white shadow shadow-gray-600 hover:text-gray-300 dark:ring-1' : ''}`}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                        toggle((previous) => !previous);
                    }
                }}
            >
                {label}
            </label>
            <input
                type="checkbox"
                id={`${label.toLowerCase()}`}
                value={`${label.toLowerCase()}`}
                checked={checked}
                onChange={(e) => toggle(e.target.checked)}
                className="hidden"
            />
        </li>
    );
}
