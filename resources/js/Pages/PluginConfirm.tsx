import PluginCard from '@/Components/PluginCard';
import Layout from '@/Layouts/Layout';
import { PageProps, Plugin, Tag } from '@/types';
import { Link } from '@inertiajs/react';

export default function PluginConfirm({
    auth,
    plugin,
    tags,
}: PageProps<{ plugin: Plugin; tags: Tag[] }>) {
    return (
        <Layout
            user={auth.user}
            title="Confim Plugin"
        >
            <PluginCard plugin={plugin} />
            <div className="text-xl space-y-5 my-6">
                <p>Does this look correct?</p>
                <div className="space-x-10">
                    <button className="text-white bg-green-600 shadow-md shadow-gray-400 dark:shadow-none py-1 px-3 rounded hover:bg-green-700">
                        Yes
                    </button>
                    <Link
                        as="button"
                        href="/plugin/add"
                        className="text-white bg-red-600 shadow-md shadow-gray-400 dark:shadow-none py-1 px-3 rounded hover:bg-red-700"
                    >
                        No
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
