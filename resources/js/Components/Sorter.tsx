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
                <div className="inline-flex divide-x divide-gray-300 dark:divide-gray-800 rounded-md shadow-sm">
                    <button
                        className="focus:z-10 inline-flex items-center gap-x-1.5 rounded-l-md bg-gradient-to-r hover:bg-gradient-to-br from-blue-700 to-green-600 hover:bg-red-500 px-3 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-gray-50"
                        onClick={onToggle}>
                        <ArrowsUpDownIcon
                            aria-hidden="true"
                            className="-ml-0.5 h-5 w-5"
                        />
                        <p className="text-sm font-semibold">{selected}</p>
                    </button>
                    <ListboxButton className="inline-flex items-center rounded-l-none rounded-r-md bg-green-600 p-2 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-gray-50">
                        <span className="sr-only">Sort Plugins</span>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="h-5 w-5 text-white"
                        />
                    </ListboxButton>
                </div>

                <ListboxOptions
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 dark:divide-gray-600 overflow-hidden rounded-md bg-white dark:bg-gray-900 dark:shadow-gray-600 shadow-lg ring-1 ring-green-600 ring-opacity-30 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in">
                    {categories.map((option) => (
                        <ListboxOption
                            value={option}
                            key={option}
                            className="group cursor-default select-none p-4 text-sm text-gray-900 dark:text-white data-[focus]:bg-green-600 data-[focus]:text-white">
                            <div className="flex flex-col">
                                <div className="flex justify-between">
                                    <p className="font-normal group-data-[selected]:font-semibold">
                                        {option}
                                    </p>
                                    <span className="text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
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
