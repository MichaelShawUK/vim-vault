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
        <div className="text-xl space-y-5 my-6">
            <p>Does this look correct?</p>
            <div className="space-x-10">
                <button
                    onClick={onConfirmation}
                    className="text-white bg-green-600 shadow-md shadow-gray-400 dark:shadow-none py-1 px-3 rounded hover:bg-green-700"
                >
                    Yes
                </button>
                <Link
                    as="button"
                    method="post"
                    href={`/plugin/reset/${id}`}
                    data={{ id }}
                    className="text-white bg-red-600 shadow-md shadow-gray-400 dark:shadow-none py-1 px-3 rounded hover:bg-red-700"
                >
                    No
                </Link>
            </div>
        </div>
    );
}
