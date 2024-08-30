import { Tag } from '@/types';
import { useState } from 'react';

export default function TagSelect({ tags }: { tags: Tag[] }) {
    const [input, setInput] = useState('');
    const filteredTags = tags.filter((tag) => tag.name.includes(input));

    let hidden = false;
    if (input === '') hidden = true;
    else hidden = false;
    if (filteredTags.length === 1 && filteredTags[0].name === input)
        hidden = true;

    return (
        <div className="w-fit">
            <div className="dark:bg-gray-800 bg-gray-200 shadow-md dark:shadow-none w-fit rounded focus-within:ring-offset-2 focus-within:ring-green-600 focus-within:ring-2 focus-within:ring-offset-gray-300">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent border-none focus:ring-0"
                />
                <button className="text-xs text-white uppercase px-2 font-bold bg-green-600 h-12 rounded-r hover:bg-green-500 active:bg-green-700">
                    Add
                </button>
            </div>
            <ul
                className={`${hidden && 'hidden'} bg-gray-200 dark:bg-gray-800 dark:shadow-none shadow-lg rounded divide-y divide-black/10 dark:divide-white/10 mt-2`}
            >
                {filteredTags.slice(0, 3).map((tag) => (
                    <li
                        key={tag.id}
                        className="hover:bg-gray-300 dark:hover:bg-gray-700 hover:rounded dark:active:bg-green-600 active:bg-green-600 active:text-white"
                    >
                        <input
                            type="button"
                            className="text-left px-3 py-2 w-full"
                            onClick={(e) => setInput(e.currentTarget.value)}
                            value={tag.name}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
