import { Head, Link } from '@inertiajs/react';
import { Tag as TagProps } from '@/types';
import Layout from '@/Layouts/Layout';
import Tag from '@/Components/Tag';

interface Props {
    tags: TagProps[];
}

export default function Home({ tags }: Props) {
    const tagItems = tags.map((tag) => <Tag tag={tag} />);

    return (
        <Layout>
            <Head title="Home" />

            <main className="max-w-4xl mx-auto text-center px-4 selection:bg-yellow-400 selection:text-black">
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
            </main>
        </Layout>
    );
}
