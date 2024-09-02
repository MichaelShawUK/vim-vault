import Sorter from './Sorter';
import { SortCategories, Plugin as PluginProps, SavablePlugin } from '@/types';
import { useState } from 'react';
import PluginCard from './PluginCard';

interface Props {
    // plugins: PluginProps[];
    plugins: SavablePlugin[];
}

export default function PluginCardSection({ plugins }: Props) {
    const [sortedPlugins, setSortedPlugins] = useState(plugins);
    const [selectedSortCategory, setSelectedSortCategory] =
        useState<SortCategories>('Stars');

    function onCategoryChange(category: SortCategories) {
        if (category === selectedSortCategory) return;
        setSelectedSortCategory(category);
        sort(category);
    }

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
                    return Date.parse(b.created_at) - Date.parse(a.created_at);
                } else return 0;
            }),
        );
    }

    function toggleSortOrder() {
        setSortedPlugins(sortedPlugins.toReversed());
    }

    return (
        <div>
            {plugins.length > 1 && (
                <Sorter
                    selected={selectedSortCategory}
                    onCategoryChange={onCategoryChange}
                    onToggle={toggleSortOrder}
                />
            )}
            <section className="space-y-12 mt-10">
                {sortedPlugins.map((plugin) => (
                    <PluginCard
                        plugin={plugin}
                        key={plugin.id}
                    />
                ))}
            </section>
        </div>
    );
}
