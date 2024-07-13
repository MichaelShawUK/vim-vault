import { Link } from '@inertiajs/react';
import { Tag as TagProps } from '@/types';

export default function Tag({ tag }: { tag: TagProps }) {
    return (
        <li key={tag.id}>
            <Link
                href={`/tags/${tag.name}`}
                className="py-2 px-4 bg-gray-200 text-gray-900 dark:text-gray-300 dark:bg-gray-800 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:shadow-sm hover:shadow-green-400 hover:ring-1 hover:ring-inset hover:ring-blue-400/60 rounded-lg font-bold focus:ring-2 focus:ring-inset focus:ring-green-600 focus:outline-0">
                {tag.name}
            </Link>
        </li>
    );
}
