import { useEffect, useRef, useState } from 'react';

export default function Search() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        document.addEventListener('keydown', function (event) {
            const key = event.key;
            const searchInput = inputRef.current;

            if (event.metaKey && (key === 'k' || key === 'K') && searchInput) {
                searchInput.focus();
                event.preventDefault();
            }
        });
    }, []);

    return (
        <div>
            <div className="relative flex items-center border-0 px-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-inset max-w-sm rounded-md dark:ring-gray-600 dark:text-white dark:bg-gray-800 bg-gray-100 text-gray-900">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="silver"
                    className="size-5">
                    <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                        clipRule="evenodd"
                    />
                </svg>
                <input
                    id="search"
                    name="search"
                    type="text"
                    ref={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="block w-full border-0 pr-3 bg-transparent laceholder:text-gray-400 focus:ring-0 sm:pr-10 sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 py-1.5 pr-1.5 hidden sm:flex">
                    <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400 dark:border-gray-700">
                        ⌘K
                    </kbd>
                </div>
            </div>
        </div>
    );
}
