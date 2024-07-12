import { Head, Link } from '@inertiajs/react';
import { Tag } from '@/types';
import Search from '@/Components/Search';
import Logo from '@/SVG/Logo';
import Layout from '@/Layouts/Layout';

interface Props {
    tags: Tag[];
}

export default function Home({ tags }: Props) {
    const tagItems = tags.map((tag) => {
        return (
            <li key={tag.id}>
                <Link
                    href={`/tags/${tag.name}`}
                    as="button">
                    {tag.name}
                </Link>
            </li>
        );
    });

    return (
        <Layout>
            <Head title="Home" />

            <h1 className="text-7xl font-extrabold">
                Discover&nbsp;
                <span className="bg-gradient-to-br from-blue-700 to-green-600 inline-block bg-clip-text text-transparent">
                    NeoVIm&nbsp;
                </span>
                Plugins
            </h1>

            <section>
                <ul>{tagItems}</ul>
            </section>
        </Layout>
    );
}
