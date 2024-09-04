import PluginCardSection from "@/Components/PluginCardSection";
import { usePlugins, usePluginsDispatch } from "@/Context/PluginsContext";
import Layout from "@/Layouts/Layout";
import { PageProps, Plugin } from "@/types";

export default function PluginSaved({ auth, plugins }: PageProps<{ plugins: Plugin[] }>) {
    plugins = plugins.map(plugin => ({ ...plugin, saved: true }))
    console.log(plugins);
    return (
        <Layout title="Saved Plugins" user={auth.user}>
            <PluginCardSection>
        </Layout>
    )
}
