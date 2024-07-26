import { Head } from '@inertiajs/react';
import { Tag as TagProps, Plugin as PluginProps } from '@/types';
import Layout from '@/Layouts/Layout';
import Tag from '@/Components/Tag';
import PluginCard from '@/Components/PluginCard';
import PluginCardSection from '@/Components/PluginCardSection';

interface Props {
    tags: TagProps[];
    plugins: PluginProps[];
}

export default function Home({ tags, plugins }: Props) {
    console.log(plugins);

    const tagItems = tags.map((tag) => (
        <Tag
            key={tag.id}
            tag={tag}
        />
    ));

    return (
        <Layout>
            <Head title="Home" />

            <div className="px-4">
                <h1 className="text-6xl sm:text-7xl font-extrabold mt-20">
                    Discover&nbsp;
                    <span className="bg-gradient-to-br from-blue-700 to-green-600 inline-block bg-clip-text text-transparent">
                        NeoVIm&nbsp;
                    </span>
                    Plugins
                </h1>

                <section className="my-14 sm:my-20">
                    <h3 className="uppercase font-bold text-lg sm:text-xl tracking-[0.4em] mb-4">
                        Popular Tags
                    </h3>
                    <ul className="flex gap-x-3 gap-y-5 px-2 sm:gap-6 sm:px-10 flex-wrap justify-center pt-4">
                        {tagItems}
                    </ul>
                </section>
            </div>

            <PluginCardSection>
                {plugins.map((plugin) => (
                    <PluginCard
                        plugin={plugin}
                        key={plugin.id}
                    />
                ))}
            </PluginCardSection>
            <p className="mt-10">PLACEHOLDER</p>
        </Layout>
    );
}
