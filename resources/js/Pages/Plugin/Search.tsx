import PluginCardSection from '@/Components/PluginCardSection';
import SiteLayout from '@/Layouts/SiteLayout';
import pluginReducer from '@/Reducers/plugins';
import { PageProps, Plugin, SavablePlugin } from '@/types';
import { usePage } from '@inertiajs/react';
import { useReducer } from 'react';

export default function Search({
    auth,
    plugins,
}: PageProps<{ plugins: Plugin[] }>) {
    const initialPlugins = plugins.map(
        (plugin): SavablePlugin => ({
            ...plugin,
            saved: auth.saved.includes(plugin.id),
        }),
    );

    const [pluginsState, dispatch] = useReducer(pluginReducer, initialPlugins);
    const page = usePage();

    return (
        <SiteLayout
            title="Search Results"
            auth={auth}
            plugins={pluginsState}
            dispatch={dispatch}
        >
            <PluginCardSection
                heading={`Search results for '${page.url.slice(17)}'`}
            />
        </SiteLayout>
    );
}
