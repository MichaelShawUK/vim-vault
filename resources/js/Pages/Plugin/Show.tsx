import CommentForm from '@/Components/CommentForm';
import CommentThread from '@/Components/CommentThread';
import PluginCardSection from '@/Components/PluginCardSection';
import SiteLayout from '@/Layouts/SiteLayout';
import pluginReducer from '@/Reducers/plugins';
import { PageProps, Plugin, SavablePlugin } from '@/types';
import { useReducer } from 'react';

export default function Show({
    auth,
    plugins,
}: PageProps<{ plugins: Plugin[] }>) {
    const initialPlugins = plugins.map(
        (plugin): SavablePlugin => ({
            ...plugin,
            saved: auth.saved.includes(plugin.id),
        }),
    );

    console.log(auth);

    const [pluginsState, dispatch] = useReducer(pluginReducer, initialPlugins);
    const plugin = plugins[0];

    return (
        <SiteLayout
            title={plugin.name}
            auth={auth}
            plugins={pluginsState}
            dispatch={dispatch}
        >
            <PluginCardSection />
            <div className="mt-14 space-y-14">
                {auth.user && (
                    <CommentForm
                        userId={auth.user.id}
                        pluginId={plugin.id}
                    />
                )}
                {/* <PluginComment /> */}
                <CommentThread comments={plugin.comments} />
            </div>
        </SiteLayout>
    );
}
