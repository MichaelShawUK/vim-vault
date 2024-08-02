import Layout from '@/Layouts/Layout';
import TagInput from '@/Components/TagInput';
import { Tag } from '@/types';
import TagBadge from '@/Components/Tag';
import { useState } from 'react';

interface Props {
    tags: Tag[];
}

export default function PluginCreate({ tags }: Props) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const addTag = (tag: Tag) =>
        setSelectedTags((tags) => {
            if (!tag) return tags;
            return tags.find((existingTags) => existingTags.id === tag.id)
                ? tags
                : [...tags, tag];
        });
    console.log(selectedTags);

    return (
        <Layout>
            <div className="space-y-10 ">
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 max-w-md focus-within:ring-2 focus-within:ring-green-600">
                    <label
                        htmlFor="url"
                        className="block text-xs font-medium text-gray-900 dark:text-white text-left">
                        Github URL
                    </label>
                    <input
                        id="url"
                        name="url"
                        type="text"
                        placeholder="www.github.com/owner/repo"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white block w-full border-0 p-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                </div>
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
        </Layout>
    );
}
