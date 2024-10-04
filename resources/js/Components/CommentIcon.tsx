import Comments from '@/SVG/Comments';
import EmptyComment from '@/SVG/EmptyComment';
import { Link } from '@inertiajs/react';

interface Props {
    pluginSlug: string;
    commentCount: number;
}
export default function CommentIcon({ pluginSlug, commentCount }: Props) {
    return (
        <Link
            className="px-1 flex gap-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            href={`/plugin/${pluginSlug}`}
        >
            {commentCount > 0 ? <Comments /> : <EmptyComment />}
            <span>{commentCount}</span>
        </Link>
    );
}
