import { Head } from '@inertiajs/react';
import { Tag as TagProps, Plugin as PluginProps } from '@/types';
import Layout from '@/Layouts/Layout';
import Tag from '@/Components/Tag';
import PluginCard from '@/Components/PluginCard';

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

            <main className="max-w-4xl mx-auto text-center sm:px-4 selection:bg-yellow-400 selection:text-black">
                <div className="px-4">
                    <h1 className="text-7xl font-extrabold mt-20">
                        Discover&nbsp;
                        <span className="bg-gradient-to-br from-blue-700 to-green-600 inline-block bg-clip-text text-transparent">
                            NeoVIm&nbsp;
                        </span>
                        Plugins
                    </h1>

                    <section className="my-20">
                        <h3 className="uppercase font-bold text-xl tracking-[0.4em] mb-4">
                            Popular Tags
                        </h3>
                        <ul className="flex gap-6 px-10 flex-wrap justify-center py-4">
                            {tagItems}
                        </ul>
                    </section>
                </div>

                <section className="space-y-12">
                    {plugins.map((plugin) => (
                        <PluginCard
                            plugin={plugin}
                            key={plugin.id}
                        />
                    ))}
                </section>
            </main>
        </Layout>
    );
}
