import PluginCardSection from '@/Components/PluginCardSection';
import SiteLayout from '@/Layouts/SiteLayout';
import pluginReducer from '@/Reducers/plugins';
import { PageProps, Plugin, SavablePlugin, SearchData } from '@/types';
import { useReducer } from 'react';

export default function Search({
    auth,
    plugins,
    searchData,
}: PageProps<{ plugins: Plugin[]; searchData: SearchData }>) {
    const initialPlugins = plugins.map(
        (plugin): SavablePlugin => ({
            ...plugin,
            saved: auth.saved.includes(plugin.id),
        }),
    );

    const [pluginsState, dispatch] = useReducer(pluginReducer, initialPlugins);

    return (
        <SiteLayout
            title="Search Results"
            auth={auth}
            plugins={pluginsState}
            dispatch={dispatch}
            searchData={searchData}
        >
            <PluginCardSection
                heading={`Search results for '${searchData.query}'`}
            />
        </SiteLayout>
    );
}
