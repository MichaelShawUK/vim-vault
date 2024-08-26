import Layout from '@/Layouts/Layout';
import { PageProps } from '@/types';
import { useForm } from '@inertiajs/react';

export default function PluginAdd({ auth }: PageProps) {
    const form = useForm();
    return (
        <Layout
            user={auth.user}
            title="Add Plugin"
        >
            <h3 className="font-bold text-lg text-gray-700 dark:text-gray-200 mb-6">
                Enter URL for GitHub repository
            </h3>
            <form>
                <div className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 max-w-md focus-within:ring-2 focus-within:ring-green-600">
                    <label
                        htmlFor="url"
                        className="block text-xs font-medium text-gray-900 dark:text-white text-left"
                    >
                        Github URL
                    </label>
                    <input
                        id="url"
                        onChange={(event) => validateUrl(event.target.value)}
                        name="url"
                        type="text"
                        autoFocus
                        placeholder="www.github.com/owner/repo"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white block w-full border-0 p-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                </div>
            </form>
        </Layout>
    );
}
