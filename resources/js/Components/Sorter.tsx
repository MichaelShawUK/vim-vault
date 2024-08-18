'use client';

import {
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import {
    CheckIcon,
    ChevronDownIcon,
    ArrowsUpDownIcon,
} from '@heroicons/react/20/solid';
import { SortCategories } from '@/types';

interface Props {
    selected: SortCategories;
    onCategoryChange: (category: SortCategories) => void;
    onToggle: () => void;
}

const categories: SortCategories[] = [
    'Stars',
    'Name',
    'Owner',
    'Updated',
    'Created',
];

export default function Sorter({
    selected,
    onCategoryChange,
    onToggle,
}: Props) {
    return (
        <Listbox
            value={selected}
            onChange={onCategoryChange}>
            <Label className="sr-only">Sort Plugins</Label>
            <div className="relative text-right">
                <div className="inline-flex divide-x divide-gray-300 dark:divide-gray-700 rounded-md shadow-sm">
                    <button
                        className="focus:z-10 inline-flex items-center gap-x-1.5 rounded-l-md px-3 py-2 bg-gray-100 dark:bg-gray-800 dark:ring-gray-700 shadow-sm dark:shadow-gray-600 dark:hover:bg-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600"
                        onClick={onToggle}>
                        <ArrowsUpDownIcon
                            aria-hidden="true"
                            className="-ml-0.5 h-5 w-5"
                        />
                        <p className="text-sm font-semibold">{selected}</p>
                    </button>
                    <ListboxButton className="inline-flex items-center rounded-l-none bg-gray-100 dark:bg-gray-800 dark:ring-gray-700 shadow-sm dark:shadow-gray-600 dark:hover:bg-gray-700 ring-1 ring-gray-300 hover:bg-gray-200 rounded-r-md p-2 focus:outline-none focus:ring-2 ">
                        <span className="sr-only">Sort Plugins</span>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="h-5 w-5 "
                        />
                    </ListboxButton>
                </div>

                <ListboxOptions
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden rounded-md bg-white dark:bg-gray-800 dark:shadow-gray-600 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in">
                    {categories.map((option) => (
                        <ListboxOption
                            value={option}
                            key={option}
                            className="group cursor-pointer select-none px-4 py-3 text-sm text-gray-900 dark:text-white data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700 data-[focus]:text-black dark:data-[focus]:text-white">
                            <div className="flex flex-col">
                                <div className="flex justify-between">
                                    <p className="font-normal group-data-[selected]:font-semibold">
                                        {option}
                                    </p>
                                    <span className="text-green-600 group-data-[focus]:text-green-600 [.group:not([data-selected])_&]:hidden">
                                        <CheckIcon
                                            aria-hidden="true"
                                            className="h-5 w-5"
                                        />
                                    </span>
                                </div>
                            </div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
}
