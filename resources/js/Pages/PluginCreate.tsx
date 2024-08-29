import Layout from '@/Layouts/Layout';
import { PageProps } from '@/types';
import { router, useForm } from '@inertiajs/react';

function validateUrl(url: string) {
    const regex =
        /^(?:https:\/\/www\.|https:\/\/|www\.)?github\.com\/(?<owner>[\w.-]+)\/(?<repo>[\w.-]+)$/;

    const found = url.match(regex);
    if (found && found.groups) {
        const { owner, repo } = found.groups;
        router.post('confirm', { owner, repo });
    }
}

export default function PluginAdd({ auth }: PageProps) {
    const regex =
        /^(?:https:\/\/www\.|https:\/\/|www\.)?github\.com\/(?<owner>[\w.-]+)\/(?<repo>[\w.-]+)$/;

    const {
        data,
        setData,
        post,
        transform,
        processing,
        errors,
        setError,
        clearErrors,
    } = useForm({
        url: '',
    });

    function clientValidation(isValidUrl: boolean) {
        if (isValidUrl) clearErrors();
        else setError('url', 'Please enter a valid GitHub repository URL');
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const found = data.url.trim().match(regex);
        clientValidation(!!found);

        if (found && found.groups) {
            const { owner, repo } = found.groups;
            transform((data) => {
                return {
                    ...data,
                    url: `https://api.github.com/repos/${owner}/${repo}`,
                };
            });

            post('/plugin/confirm');
        }
    }

    return (
        <Layout
            user={auth.user}
            title="Add Plugin"
        >
            <h3 className="font-bold text-lg text-gray-700 dark:text-gray-200 mb-6">
                Enter URL for GitHub repository
            </h3>
            <form onSubmit={submit}>
                <div className="mx-auto w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 max-w-md focus-within:ring-2 focus-within:ring-green-600">
                    <label
                        htmlFor="url"
                        className="block text-xs font-medium text-gray-900 dark:text-white text-left"
                    >
                        Github URL
                    </label>
                    <input
                        id="url"
                        value={data.url}
                        onChange={(e) => setData('url', e.target.value)}
                        // onChange={(event) => validateUrl(event.target.value)}
                        // onPaste={(event) =>
                        //     validateUrl(event.clipboardData.getData('text'))
                        // }
                        name="url"
                        type="text"
                        autoFocus
                        placeholder="www.github.com/owner/repo"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white block w-full border-0 p-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                </div>
                {errors.url && (
                    <p className="absolute left-0 right-0 text-red-600 text-xs mt-2">
                        {errors.url}
                    </p>
                )}
                <button className="mt-8 bg-gray-600/10 rounded px-3 py-2">
                    Submit
                </button>
            </form>
        </Layout>
    );
}
