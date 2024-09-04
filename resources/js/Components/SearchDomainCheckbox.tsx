import { useRef, useState } from 'react';

export default function SearchDomainCheckbox({ label }: { label: string }) {
    const [searchDomain, setSearchDomain] = useState(true);
    const checkboxRef = useRef<HTMLInputElement>(null);
    return (
        <li>
            <label
                htmlFor={`${label.toLowerCase()}`}
                className={`text-xs font-bold uppercase py-1 px-1 rounded ring-inset dark:ring-white/20 ${searchDomain ? 'dark:bg-blue-900 ring-1' : ''}`}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.code === 'Enter' || e.code === 'Space') {
                        setSearchDomain((previous) => !previous);
                    }
                }}
            >
                {label}
            </label>
            <input
                type="checkbox"
                id={`${label.toLowerCase()}`}
                value={`${label.toLowerCase()}`}
                checked={searchDomain}
                onChange={(e) => setSearchDomain(e.target.checked)}
                className="hidden"
                ref={checkboxRef}
            />
        </li>
    );
}
