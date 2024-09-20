import PluginCardSection from '@/Components/PluginCardSection';
import useSearch from '@/hooks/useSearch';
import SiteLayout from '@/Layouts/SiteLayout';
import pluginReducer from '@/Reducers/plugins';
import { PageProps, Plugin, SavablePlugin, SearchData } from '@/types';
import { useReducer } from 'react';

export default function Search({
    auth,
    plugins,
    searchData,
}: PageProps<{ plugins: Plugin[]; searchData: SearchData }>) {
    const { updateSearchData } = useSearch();
    updateSearchData(searchData);
    console.log('*******************************');
    console.log(searchData);
    console.log('*******************************');
    const initialPlugins = plugins.map(
        (plugin): SavablePlugin => ({
            ...plugin,
            saved: auth.saved.includes(plugin.id),
        }),
    );

    const [pluginsState, dispatch] = useReducer(pluginReducer, initialPlugins);
    // TODO: Remember serach categories state after submitting search query

    return (
        <SiteLayout
            title="Search Results"
            auth={auth}
            plugins={pluginsState}
            dispatch={dispatch}
        >
            <PluginCardSection
                heading={`Search results for '${searchData.query}'`}
            />
        </SiteLayout>
    );
}
