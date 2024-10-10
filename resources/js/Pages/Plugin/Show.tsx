import PluginComment from '@/Components/PluginComment';
import CommentForm from '@/Components/CommentForm';
import PluginCardSection from '@/Components/PluginCardSection';
import SiteLayout from '@/Layouts/SiteLayout';
import pluginReducer from '@/Reducers/plugins';
import { PageProps, Plugin, SavablePlugin } from '@/types';
import { useReducer } from 'react';

export default function Show({
    auth,
    plugins,
}: PageProps<{ plugins: Plugin[] }>) {
    console.log(plugins);
    const initialPlugins = plugins.map(
        (plugin): SavablePlugin => ({
            ...plugin,
            saved: auth.saved.includes(plugin.id),
        }),
    );

    const [pluginsState, dispatch] = useReducer(pluginReducer, initialPlugins);

    return (
        <SiteLayout
            title={plugins[0].name}
            auth={auth}
            plugins={pluginsState}
            dispatch={dispatch}
        >
            <PluginCardSection />
            <div>
                <CommentForm />
                <PluginComment />
            </div>
        </SiteLayout>
    );
}
