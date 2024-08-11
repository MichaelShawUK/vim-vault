import Layout from '@/Layouts/Layout';
import PluginCardSection from '@/Components/PluginCardSection';
import PluginCard from '@/Components/PluginCard';
import { Plugin as PluginProps } from '@/types';

interface Props {
    tag: string;
    plugins: PluginProps[];
}
export default function TagQuery({ tag, plugins }: Props) {
    console.log(plugins[0]);
    return (
        <Layout title={`${tag} plugins`}>
            <h2 className="font-bold sm:text-xl text-left mb-10 text-gray-900 dark:text-gray-300">
                {tag} plugins
            </h2>
            <PluginCardSection>
                {plugins.map((plugin) => (
                    <PluginCard
                        plugin={plugin}
                        key={plugin.id}
                    />
                ))}
            </PluginCardSection>
        </Layout>
    );
}
