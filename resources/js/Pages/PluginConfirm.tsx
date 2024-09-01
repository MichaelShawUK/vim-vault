import PluginCard from '@/Components/PluginCard';
import PluginConfirmationPrompt from '@/Components/PluginConfirmationPrompt';
import TagSelect from '@/Components/TagSelect';
import Layout from '@/Layouts/Layout';
import { PageProps, Plugin, Tag } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function PluginConfirm({
    auth,
    plugin: initialPlugin,
    tags,
}: PageProps<{ plugin: Plugin; tags: Tag[] }>) {
    const [confirmed, setConfirmed] = useState(false);
    const [selectedTagsNames, setSelectedTagsNames] = useState<string[]>([]);
    const [plugin, setPlugin] = useState<Plugin>({
        ...initialPlugin,
        tags: [],
    });
    console.log(plugin);

    const onClear = () => {
        setSelectedTagsNames([]);
        setPlugin({
            ...initialPlugin,
            tags: [],
        });
    };

    const onSelect = (name: string) => {
        if (selectedTagsNames.includes(name)) return;
        if (name.trim() === '') return;
        setSelectedTagsNames((prev) => [...prev, name]);
        setPlugin((prev) => {
            return {
                ...prev,
                tags: [
                    ...prev.tags,
                    {
                        id: selectedTagsNames.length,
                        name,
                        hits: 1,
                        updated_at: null,
                        created_at: null,
                        plugins: [],
                    },
                ],
            };
        });
    };

    return (
        <Layout
            user={auth.user}
            title="Confim Plugin"
        >
            <PluginCard plugin={plugin} />
            {!confirmed && (
                <PluginConfirmationPrompt
                    onConfirmation={() => setConfirmed(true)}
                    id={plugin.id.toString()}
                />
            )}
            {confirmed && (
                <div>
                    <h3 className="mt-6">
                        Add tag(s) to this plugin to make it easier to discover
                    </h3>
                    <div className="flex gap-x-4 justify-center mt-6">
                        <TagSelect
                            tags={tags}
                            onSelect={onSelect}
                        />
                        <button
                            onClick={onClear}
                            className={`text-xs h-12 text-white hover:bg-red-500 active:bg-red-700 bg-red-600 px-3 uppercase font-bold rounded py-2 disabled:bg-gray-300 dark:disabled:bg-gray-600 dark:disabled:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-100  focus-visible:ring-offset-2 focus-within:ring-offset-red-400`}
                            disabled={selectedTagsNames.length === 0}
                        >
                            Clear
                        </button>
                    </div>
                    <Link
                        as="button"
                        href="/plugin/add-tags"
                        method="post"
                        data={{ id: plugin.id, tags: selectedTagsNames }}
                        className="bg-gradient-to-br from-blue-700 to-green-600 mt-10 px-5 py-2 text-xs uppercase font-bold text-white rounded h-12 hover:bg-gradient-to-br hover:from-blue-600 hover:to-green-500 active:bg-gradient-to-br active:from-blue-800 active:to-green-700"
                    >
                        Save
                    </Link>
                </div>
            )}
        </Layout>
    );
}
