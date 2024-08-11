import Layout from '@/Layouts/Layout';
import PluginCardSection from '@/Components/PluginCardSection';
import { Plugin as PluginProps } from '@/types';

interface Props {
    tag: string;
    plugins: PluginProps[];
}
export default function TagQuery({ tag, plugins }: Props) {
    return (
        <Layout title={`${tag} plugins`}>
            <h2 className="font-bold sm:text-xl text-left mb-10 text-gray-900 dark:text-gray-300">
                {tag} plugins
            </h2>
            <PluginCardSection plugins={plugins} />
        </Layout>
    );
}
