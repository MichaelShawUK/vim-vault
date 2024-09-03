import PluginCardSection from "@/Components/PluginCardSection";
import Layout from "@/Layouts/Layout";
import { PageProps, Plugin } from "@/types";

export default function PluginSaved({ auth, plugins }: PageProps<{ plugins: Plugin[] }>) {
    plugins = plugins.map(plugin => ({ ...plugin, saved: true }))
    return (
        <Layout title="Saved Plugins" user={auth.user}>
            <PluginCardSection>
        </Layout>
    )
}
