'use client';

import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { useForm } from '@inertiajs/react';

interface Props {
    userId: number;
    pluginId: number;
}

export default function CommentForm({ userId, pluginId }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        comment: '',
        userId,
        pluginId,
    });

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post('/comment');
    }

    return (
        <div className="flex items-start space-x-4 max-w-2xl mx-auto border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-lg sm:border border-y py-3 px-1 sm:px-8 sm:rounded">
            <div className="flex-shrink-0">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="inline-block h-10 w-10 rounded-full"
                />
            </div>
            <div className="min-w-0 flex-1">
                <form onSubmit={submit}>
                    <div className="border-b border-gray-200 focus-within:border-blue-700">
                        <label
                            htmlFor="comment"
                            className="sr-only"
                        >
                            Add your comment
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            rows={3}
                            placeholder="Add your comment..."
                            className="p-2 rounded-t dark:bg-gray-800 bg-gray-100 dark:text-white block w-full resize-none border-0 border-b pb-2 text-gray-900 placeholder:text-gray-600 dark:placeholder:text-gray-300 focus:border-blue-700 focus:ring-0 sm:text-sm sm:leading-6"
                            value={data.comment}
                            onChange={(
                                event: React.ChangeEvent<HTMLTextAreaElement>,
                            ) => setData('comment', event.target.value)}
                        />
                    </div>
                    <div className="flex justify-end pt-3">
                        {/* <div className="flex items-center space-x-5"> */}
                        {/*     <div className="flow-root"> */}
                        {/*         <button */}
                        {/*             type="button" */}
                        {/*             className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500" */}
                        {/*         > */}
                        {/*             <CodeBracketIcon */}
                        {/*                 aria-hidden="true" */}
                        {/*                 className="h-6 w-6" */}
                        {/*             /> */}
                        {/*             <span className="sr-only"> */}
                        {/*                 Add code snippet */}
                        {/*             </span> */}
                        {/*         </button> */}
                        {/*     </div> */}
                        {/* </div> */}
                        <div className="flex-shrink-0">
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-md bg-gradient-to-br from-blue-700 to-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-br hover:from-blue-600 hover:to-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:to-gray-400 disabled:from-gray-400 disabled:text-gray-200 dark:disabled:to-gray-700 dark:disabled:from-gray-700 dark:disabled:text-gray-400 disabled:cursor-not-allowed"
                                disabled={
                                    processing || data.comment.trim() === ''
                                }
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
