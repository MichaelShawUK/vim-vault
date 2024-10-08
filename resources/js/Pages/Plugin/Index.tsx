import Banner from '@/Components/Banner';
import PluginCardSection from '@/Components/PluginCardSection';
import PopularTags from '@/Components/PopularTagsSection';
import SiteLayout from '@/Layouts/SiteLayout';
import pluginReducer from '@/Reducers/plugins';
import { PageProps, Plugin, SavablePlugin, Tag } from '@/types';
import { useReducer } from 'react';

export default function Index({
    auth,
    plugins,
    tags,
}: PageProps<{ plugins: Plugin[]; tags: Tag[] }>) {
    const initialPlugins = plugins.map(
        (plugin): SavablePlugin => ({
            ...plugin,
            saved: auth.saved.includes(plugin.id),
        }),
    );

    const [pluginsState, dispatch] = useReducer(pluginReducer, initialPlugins);
    return (
        <SiteLayout
            title="Home"
            auth={auth}
            plugins={pluginsState}
            dispatch={dispatch}
        >
            <div className="px-4">
                <Banner />
                <PopularTags tags={tags} />
            </div>
            <PluginCardSection />
        </SiteLayout>
    );
}
