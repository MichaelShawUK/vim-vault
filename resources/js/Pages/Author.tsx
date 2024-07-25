import { Author as AuthorProps } from '@/types';
import Layout from '@/Layouts/Layout';
import PluginCard from '@/Components/PluginCard';

interface Props {
    owner: AuthorProps;
}
export default function Author({ owner }: Props) {
    console.log(owner);

    return (
        <Layout>
            {owner.plugins.map((plugin) => {
                plugin.author = owner;
                return (
                    <PluginCard
                        key={plugin.id}
                        plugin={plugin}
                    />
                );
            })}
        </Layout>
    );
}
