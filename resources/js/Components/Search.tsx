import { FormEvent, useEffect, useRef, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import SearchDomainCheckbox from './SearchDomainCheckbox';
import UpArrow from '@/SVG/UpArrow';
import DownArrow from '@/SVG/DownArrow';

export default function Search() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [hideCategories, setHideCategories] = useState(true);

    // TODO: Display error message when no category selected
    //       Use 1 button to toggle category section
    //       Toggle display with CSS

    const { data, setData, post, errors, setError, clearErrors } = useForm({
        query: '',
        searchName: true,
        searchTag: true,
        searchDescription: true,
        searchOwner: true,
    });

    const toggleName = () =>
        setData((data) => ({ ...data, searchName: !data.searchName }));

    const toggleTag = () =>
        setData((data) => ({ ...data, searchTag: !data.searchTag }));

    const toggleDescription = () =>
        setData((data) => ({
            ...data,
            searchDescription: !data.searchDescription,
        }));

    const toggleOwner = () =>
        setData((data) => ({ ...data, searchOwner: !data.searchOwner }));

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

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (
            !data.searchName &&
            !data.searchTag &&
            !data.searchDescription &&
            !data.searchOwner
        ) {
            setError('query', 'Select at least one category');
            return;
        } else {
            clearErrors('query');
        }
        post('/plugin/search');
        // router.get('/plugin/search', { q: query });
    }

    function focusInput() {
        if (inputRef.current) inputRef.current.focus();
    }

    // TODO: Move form onClick handler to child div
    return (
        <form
            className="col-span-full mx-auto pt-6 relative pb-28"
            onSubmit={handleSubmit}
        >
            {errors.query && (
                <p className="text-xs text-center uppercase text-red-500 font-bold mb-2 absolute top-0 left-0 right-0">
                    {errors.query}
                </p>
            )}
            <div
                onClick={focusInput}
                className="relative flex items-center border-0 px-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-inset max-w-sm rounded-md dark:ring-gray-600 dark:text-white dark:bg-gray-800 bg-gray-100 text-gray-900"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="silver"
                    className="size-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                        clipRule="evenodd"
                    />
                </svg>
                <input
                    id="q"
                    name="q"
                    type="text"
                    ref={inputRef}
                    value={data.query}
                    // value={query}
                    onChange={(event) => setData('query', event.target.value)}
                    // onChange={(event) => setQuery(event.target.value)}
                    className="block w-full border-0 pr-3 bg-transparent laceholder:text-gray-400 focus:ring-0 sm:pr-10 sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 py-1.5 pr-1.5 hidden sm:flex">
                    <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400 dark:border-gray-700">
                        ⌘K
                    </kbd>
                </div>
            </div>
            <div className="flex flex-col items-center mt-2 absolute w-full">
                {hideCategories ? (
                    <button
                        type="button"
                        onClick={() => setHideCategories(false)}
                        // WARN: Red error ring displayed for any error in error.query field
                        className={
                            errors.query
                                ? 'ring-2 ring-red-500 rounded-full'
                                : ''
                        }
                    >
                        <DownArrow />
                    </button>
                ) : (
                    <div className="animate-fadeIn w-full text-center">
                        <h4 className="text-center mb-2">
                            Search in these categories
                        </h4>
                        <ul className="flex justify-between w-full mb-3">
                            <SearchDomainCheckbox
                                label="Name"
                                checked={data.searchName}
                                toggle={toggleName}
                            />
                            <SearchDomainCheckbox
                                label="Tag"
                                checked={data.searchTag}
                                toggle={toggleTag}
                            />
                            <SearchDomainCheckbox
                                label="Description"
                                checked={data.searchDescription}
                                toggle={toggleDescription}
                            />
                            <SearchDomainCheckbox
                                label="Owner"
                                checked={data.searchOwner}
                                toggle={toggleOwner}
                            />
                        </ul>
                        <button
                            type="button"
                            onClick={() => setHideCategories(true)}
                        >
                            <UpArrow />
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
}
