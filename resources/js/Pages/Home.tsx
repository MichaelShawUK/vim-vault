import { Head } from '@inertiajs/react';
import { Tag as TagProps, Plugin as PluginProps } from '@/types';
import Layout from '@/Layouts/Layout';
import Tag from '@/Components/Tag';
import PluginCard from '@/Components/PluginCard';
import PluginCardSection from '@/Components/PluginCardSection';
import { useState } from 'react';
import Sorter from '@/Components/Sorter';
import { SortCategories } from '@/types';

interface Props {
    tags: TagProps[];
    plugins: PluginProps[];
}

const sortCategories: SortCategories[] = [
    'Stars',
    'Name',
    'Owner',
    'Updated',
    'Created',
];

export default function Home({ tags, plugins }: Props) {
    console.log(plugins);
    const [sortedPlugins, setSortedPlugins] = useState(plugins);
    const [selectedSortCategory, setSelectedSortCategory] =
        useState<SortCategories>('Stars');

    function onCategoryChange(category: SortCategories) {
        if (category === selectedSortCategory) return;
        setSelectedSortCategory(category);
        sort(category);
    }

    const tagItems = tags.map((tag) => (
        <Tag
            key={tag.id}
            tag={tag}
        />
    ));

    function sort(category: SortCategories) {
        setSortedPlugins(
            sortedPlugins.toSorted((a, b) => {
                if (category === 'Stars')
                    return b.stargazers_count - a.stargazers_count;
                else if (category === 'Name') {
                    return a.name > b.name ? 1 : -1;
                } else if (category === 'Owner') {
                    return a.author.login > b.author.login ? 1 : -1;
                } else if (category === 'Updated') {
                    return Date.parse(b.updated_at) - Date.parse(a.updated_at);
                } else if (category === 'Created') {
                    return Date.parse(b.updated_at) - Date.parse(a.updated_at);
                } else return 0;
            }),
        );
    }

    function toggleSortOrder() {
        setSortedPlugins(sortedPlugins.toReversed());
    }

    return (
        <Layout>
            <Head title="Home" />

            <div className="px-4">
                <h1 className="text-6xl sm:text-7xl font-extrabold mt-20">
                    Discover&nbsp;
                    <span className="bg-gradient-to-br from-blue-700 to-green-600 inline-block bg-clip-text text-transparent">
                        NeoVIm&nbsp;
                    </span>
                    Plugins
                </h1>

                <section className="my-14 sm:my-20">
                    <h3 className="uppercase font-bold text-lg sm:text-xl tracking-[0.4em] mb-4">
                        Popular Tags
                    </h3>
                    <ul className="flex gap-x-3 gap-y-5 px-2 sm:gap-6 sm:px-10 flex-wrap justify-center pt-4">
                        {tagItems}
                    </ul>
                </section>
            </div>

            <Sorter
                categories={sortCategories}
                selected={selectedSortCategory}
                onCategoryChange={onCategoryChange}
                onToggle={toggleSortOrder}
            />

            <PluginCardSection>
                {sortedPlugins.map((plugin) => (
                    <PluginCard
                        plugin={plugin}
                        key={plugin.id}
                    />
                ))}
            </PluginCardSection>
            <p className="mt-10">PLACEHOLDER</p>
        </Layout>
    );
}
