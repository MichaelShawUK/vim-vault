import Sorter from './Sorter';
import { SortCategories, Plugin as PluginProps, SavablePlugin } from '@/types';
import { useReducer, useState } from 'react';
import PluginCard from './PluginCard';
import pluginReducer from '@/Reducers/plugins';

interface Props {
    plugins: SavablePlugin[];
}

export default function PluginCardSection({ plugins }: Props) {
    const [selectedSortCategory, setSelectedSortCategory] =
        useState<SortCategories>('Stars');

    const [state, dispatch] = useReducer(pluginReducer, plugins);

    function toggleSaveStatus(pluginId: string) {
        console.log(pluginId);
        dispatch({ type: 'toggle_save', pluginId });
    }

    const reverseSort = () => dispatch({ type: 'toggle_sort_order' });

    function sortBy(category: SortCategories) {
        setSelectedSortCategory(category);
        switch (category.toLowerCase()) {
            case 'stars':
                dispatch({ type: 'sort_by_stars' });
                break;
            case 'name':
                dispatch({ type: 'sort_by_name' });
                break;
            case 'owner':
                dispatch({ type: 'sort_by_owner' });
                break;
            case 'updated':
                dispatch({ type: 'sort_by_updated' });
                break;
            case 'created':
                dispatch({ type: 'sort_by_created' });
                break;
        }
    }

    return (
        <div>
            {plugins.length > 1 && (
                <Sorter
                    selected={selectedSortCategory}
                    onToggle={reverseSort}
                    onSort={sortBy}
                />
            )}
            <section className="space-y-12 mt-10">
                {state.map((plugin) => (
                    <PluginCard
                        plugin={plugin}
                        key={plugin.id}
                        onSave={toggleSaveStatus}
                    />
                ))}
            </section>
        </div>
    );
}
