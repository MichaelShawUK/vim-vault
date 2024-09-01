import { Tag } from '@/types';
import { useState, useRef } from 'react';

const CHAR_LIMIT = 20;

interface Props {
    tags: Tag[];
    onSelect: (name: string) => void;
}

export default function TagSelect({ tags, onSelect }: Props) {
    const [input, setInput] = useState('');
    const [isTooLong, setIsTooLong] = useState(false);
    const filteredTags = tags.filter((tag) => tag.name.includes(input));
    const inputRef = useRef<HTMLInputElement>(null);

    let hidden = false;
    if (input === '') hidden = true;
    else hidden = false;
    if (filteredTags.length === 1 && filteredTags[0].name === input)
        hidden = true;

    function addTagHandler(tag: string) {
        if (tag.length > CHAR_LIMIT) {
            setIsTooLong(true);
            return;
        } else setIsTooLong(false);
        onSelect(tag);
        setInput('');
        inputRef.current && inputRef.current.focus();
    }

    return (
        <div className="w-fit relative">
            {/* <div className="dark:bg-gray-800 bg-gray-200 shadow-md dark:shadow-none w-fit rounded focus-within:ring-offset-2 focus-within:ring-green-600 focus-within:ring-2 focus-within:ring-offset-gray-300"> */}
            <div>
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={input}
                        ref={inputRef}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter')
                                addTagHandler(e.currentTarget.value);
                        }}
                        className="dark:bg-gray-800 ring-1 ring-inset ring-gray-200 dark:ring-gray-700 bg-gray-200 shadow-md dark:shadow-none h-12 rounded focus-within:ring-offset-2 focus-within:ring-green-600 focus-within:ring-2 focus-within:ring-offset-gray-300 border-none"
                        autoFocus
                    />
                    <button
                        onClick={() => addTagHandler(input)}
                        className="text-xs text-white uppercase px-2 font-bold bg-green-600 h-12 rounded hover:bg-green-500 active:bg-green-700 focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-offset-green-400 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-100  outline-none"
                    >
                        Add
                    </button>
                </div>
                {isTooLong && (
                    <p className="text-xs text-red-600 mt-2 absolute">
                        Tag must not exceed {CHAR_LIMIT} characters
                    </p>
                )}
                {/* <button */}
                {/*     onClick={() => addTagHandler(input)} */}
                {/*     className="text-xs text-white uppercase px-2 font-bold bg-green-600 h-12 rounded-r hover:bg-green-500 active:bg-green-700" */}
                {/* > */}
                {/*     Add */}
                {/* </button> */}
            </div>
            <ul
                className={`${hidden && 'hidden'} absolute w-full ring-1 ring-inset ring-gray-200 dark:ring-gray-700 bg-gray-200 dark:bg-gray-800 dark:shadow-none shadow-lg rounded divide-y divide-black/10 dark:divide-white/10 mt-2`}
            >
                {filteredTags.slice(0, 3).map((tag) => (
                    <li
                        key={tag.id}
                        className="hover:bg-gray-300 dark:hover:bg-gray-700 hover:rounded dark:active:bg-green-600 active:bg-green-600 active:text-white"
                    >
                        <input
                            type="button"
                            className="text-left px-3 py-2 w-full"
                            onClick={(e) =>
                                addTagHandler(e.currentTarget.value)
                            }
                            value={tag.name}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
