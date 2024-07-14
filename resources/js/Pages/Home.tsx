import { Head, Link } from '@inertiajs/react';
import { Tag as TagProps } from '@/types';
import Layout from '@/Layouts/Layout';
import Tag from '@/Components/Tag';
import { Octokit } from 'octokit';
import { useEffect } from 'react';

interface Props {
    tags: TagProps[];
}

export default function Home({ tags }: Props) {
    const tagItems = tags.map((tag) => (
        <Tag
            key={tag.id}
            tag={tag}
        />
    ));

    // GITHUB TOKEN expires 21 July
    const octokit = new Octokit({
        auth: import.meta.env.VITE_GITHUB_TOKEN,
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await octokit.request(
                'GET /repos/stevearc/conform.nvim',
            );

            throw 'custom error';

            console.log(response);
        };

        fetchData().catch((error) => console.log('ERRORRRRR: ', error));
    }, []);
    console.log(import.meta.env.VITE_GITHUB_TOKEN);

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
