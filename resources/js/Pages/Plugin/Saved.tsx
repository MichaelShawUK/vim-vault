import PluginCardSection from '@/Components/PluginCardSection';
import SiteLayout from '@/Layouts/SiteLayout';
import pluginReducer from '@/Reducers/plugins';
import { PageProps, Plugin, SavablePlugin } from '@/types';
import { useReducer } from 'react';

export default function Saved({
    auth,
    plugins,
}: PageProps<{ plugins: Plugin[] }>) {
    const initialPlugins = plugins.map(
        (plugin): SavablePlugin => ({
            ...plugin,
            saved: true,
        }),
    );

    const [pluginsState, dispatch] = useReducer(pluginReducer, initialPlugins);
    return (
        <SiteLayout
            title="Saved Plugins"
            auth={auth}
            plugins={pluginsState}
            dispatch={dispatch}
        >
            <PluginCardSection heading="Saved Plugins" />
        </SiteLayout>
    );
}
