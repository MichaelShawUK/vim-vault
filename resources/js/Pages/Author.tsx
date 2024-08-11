import { Author as AuthorProps } from '@/types';
import Layout from '@/Layouts/Layout';
import PluginCardSection from '@/Components/PluginCardSection';

interface Props {
    owner: AuthorProps;
}
export default function Author({ owner }: Props) {
    owner.plugins.forEach((plugin) => (plugin.author = owner));
    console.log(owner);

    return (
        <Layout title={`${owner.login} plugins`}>
            <div className="flex items-center justify-center sm:justify-left gap-3 mb-10">
                <img
                    src={owner.avatar_url}
                    height={30}
                    width={30}
                    className="rounded"
                />
                <h2 className="sm:text-xl font-bold sm:mr-auto text-gray-900 dark:text-gray-300">
                    {owner.login} plugins
                </h2>
            </div>
            <PluginCardSection plugins={owner.plugins} />
        </Layout>
    );
}
