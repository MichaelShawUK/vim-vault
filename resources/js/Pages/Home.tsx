import { Link } from '@inertiajs/react';
import { Tag as TagProps, Plugin as PluginProps, SavablePlugin } from '@/types';
import Layout from '@/Layouts/Layout';
import Tag from '@/Components/Tag';
import PluginCardSection from '@/Components/PluginCardSection';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Home({
    auth,
    tags,
    plugins,
    saved,
}: PageProps<{ tags: TagProps[]; plugins: PluginProps[]; saved: number[] }>) {
    const tagItems = tags.map((tag) => (
        <Tag
            key={tag.id}
            tag={tag}
        />
    ));

    const savablePlugins = plugins.map(
        (plugin): SavablePlugin => ({
            ...plugin,
            saved: saved.includes(plugin.id),
        }),
    );

    return (
        <Layout
            title="Home"
            user={auth.user}
        >
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

            <Link href="/test">Test</Link>

            <PluginCardSection plugins={savablePlugins} />
            <p className="mt-10">PLACEHOLDER</p>
        </Layout>
    );
}
