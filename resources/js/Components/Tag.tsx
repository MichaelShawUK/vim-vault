import { Link } from '@inertiajs/react';
import { Tag as TagProps } from '@/types';

interface Props {
    tag: TagProps;
    size?: 'sm' | 'md';
    background?: string;
}

export default function Tag({
    tag,
    size = 'md',
    background = 'bg-gray-200 dark:bg-gray-800',
}: Props) {
    let sizeClasses = '';

    switch (size) {
        case 'sm':
            sizeClasses = 'px-2 py-1 rounded-md';
            break;
        default:
            sizeClasses = 'py-2 px-4 rounded-lg';
    }

    return (
        <li>
            <Link
                href={`/tags/${tag.name}`}
                className={`${sizeClasses} ${background} text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-400 dark:ring-gray-600 hover:shadow-sm hover:shadow-green-400 hover:ring-1 hover:ring-inset hover:ring-blue-400/60 font-bold focus:ring-2 focus:ring-inset focus:ring-green-600 focus:outline-0`}>
                {tag.name}
            </Link>
        </li>
    );
}
