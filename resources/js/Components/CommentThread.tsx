import { Comment as CommentType } from '@/types';
import Comment from './Comment';

interface Props {
    comments: CommentType[];
}

export default function CommentThread({ comments }: Props) {
    return (
        <section className="max-w-2xl mx-auto border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-lg sm:border border-y py-3 px-1 sm:px-8 sm:rounded">
            {comments.length === 0 && <p>There are currently no comments.</p>}
            {comments.length > 0 && (
                <div>
                    <Comment />
                </div>
            )}
        </section>
    );
}
