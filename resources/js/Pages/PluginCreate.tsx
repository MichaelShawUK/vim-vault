import Layout from '@/Layouts/Layout';
import TagInput from '@/Components/TagInput';
import { Tag, PageProps, Plugin } from '@/types';
import TagBadge from '@/Components/Tag';
import PluginCard from '@/Components/PluginCard';
import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function PluginCreate({
    plugin,
    tags,
    auth,
}: PageProps<{ tags: Tag[]; plugin?: Plugin }>) {
    const page = usePage();
    console.log(page);
    const error = page.props.errors;
    console.log(error);
    const [confirmed, setConfirmed] = useState(false);
    console.log('PLUGIN: ', plugin);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const regex =
        /^(?:https:\/\/www\.|https:\/\/|www\.)?github\.com\/(?<owner>[\w.-]+)\/(?<repo>[\w.-]+)$/;

    const validateUrl = (url: string) => {
        if (url.match(regex)) console.log('MATCH');
        console.log(url.match(regex));
        const found = url.match(regex);
        if (found && found.groups) {
            router.post('confirm', {
                owner: found.groups.owner,
                repo: found.groups.repo,
            });
        }
        // if (regex.test(url)) router.post('checkurl', { url });
        // else console.log('NO MATCH');
    };

    const addTag = (tag: Tag) =>
        setSelectedTags((tags) => {
            if (!tag) return tags;
            return tags.find((existingTags) => existingTags.id === tag.id)
                ? tags
                : [...tags, tag];
        });

    return (
        <Layout
            title="New Plugin"
            user={auth.user}>
            <div className="">
                {!plugin && (
                    <div className="flex flex-col items-center w-full">
                        <h3 className="font-bold text-lg text-gray-700 dark:text-gray-200 mb-6">
                            Enter URL for GitHub repository
                        </h3>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 max-w-md focus-within:ring-2 focus-within:ring-green-600">
                            <label
                                htmlFor="url"
                                className="block text-xs font-medium text-gray-900 dark:text-white text-left">
                                Github URL
                            </label>
                            <input
                                id="url"
                                onChange={(event) =>
                                    validateUrl(event.target.value)
                                }
                                name="url"
                                type="text"
                                autoFocus
                                placeholder="www.github.com/owner/repo"
                                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white block w-full border-0 p-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {/* {error & <p>{error}</p>} */}
                    </div>
                )}
                {plugin && <PluginCard plugin={plugin} />}
                {plugin && (
                    <div className="text-xl space-y-5 my-6">
                        <p>Does this look correct?</p>
                        <div className="space-x-10">
                            <button className="text-white bg-green-600 shadow-md shadow-gray-400 dark:shadow-none py-1 px-3 rounded hover:bg-green-700">
                                Yes
                            </button>
                            <Link
                                as="button"
                                href="/plugin/add"
                                className="text-white bg-red-600 shadow-md shadow-gray-400 dark:shadow-none py-1 px-3 rounded hover:bg-red-700">
                                No
                            </Link>
                        </div>
                    </div>
                )}
                {plugin && (
                    <div>
                        <TagInput
                            tags={tags}
                            onAdd={addTag}
                        />
                        <ul className="flex gap-4">
                            {selectedTags.map((tag) => (
                                <TagBadge
                                    tag={tag}
                                    key={tag.id}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Layout>
    );
}
