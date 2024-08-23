'use client';

import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Label,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { Tag } from '@/types';

interface Props {
    tags: Tag[];
    onAdd: (tag: Tag) => void;
}

export default function TagInput({ tags, onAdd }: Props) {
    const [query, setQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    console.log('Selected Tag: ', selectedTag);

    const filteredTags =
        query === ''
            ? tags
            : tags.filter((tag) => {
                  return tag.name.toLowerCase().includes(query.toLowerCase());
              });

    return (
        <Combobox
            as="div"
            value={selectedTag}
            onChange={(tag: Tag) => {
                setQuery('');
                setSelectedTag(() => {
                    onAdd(tag);
                    return tag;
                });
            }}>
            <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Add tag
            </Label>
            <div className="relative mt-2">
                <ComboboxInput
                    className="w-full text-center rounded-md border-0 bg-gray-100 dark:bg-gray-800 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setQuery(event.target.value)}
                    onBlur={() => setQuery('')}
                    displayValue={(tag: Tag) => tag?.name}
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </ComboboxButton>

                {filteredTags.length > 0 && (
                    <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-100 dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredTags.map((tag) => (
                            <ComboboxOption
                                key={tag.id}
                                value={tag}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 dark:text-white data-[focus]:bg-green-600 data-[focus]:text-white">
                                <span className="block truncate group-data-[selected]:font-semibold">
                                    {tag.name}
                                </span>

                                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                                    <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </span>
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                )}
            </div>
        </Combobox>
    );
}
