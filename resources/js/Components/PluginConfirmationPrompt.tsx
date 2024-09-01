import { Link } from '@inertiajs/react';

interface Props {
    onConfirmation: () => void;
    id: string;
}

export default function PluginConfirmationPrompt({
    onConfirmation,
    id,
}: Props) {
    return (
        <div className="space-y-5 my-6">
            <p>Does this look correct?</p>
            <div className="space-x-10">
                <button
                    onClick={onConfirmation}
                    className="text-white text-xs font-bold uppercase bg-green-600 shadow-md shadow-gray-400 dark:shadow-none py-3 px-4 rounded hover:bg-green-500 focus-within:bg-green-700"
                >
                    Yes
                </button>
                <Link
                    as="button"
                    method="post"
                    href={`/plugin/reset/${id}`}
                    data={{ id }}
                    className="text-white text-xs font-bold uppercase bg-red-600 shadow-md shadow-gray-400 dark:shadow-none py-3 px-4 rounded hover:bg-red-500 focus-within:bg-red-700"
                >
                    No
                </Link>
            </div>
        </div>
    );
}
