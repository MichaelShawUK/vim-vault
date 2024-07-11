import { Head, Link } from '@inertiajs/react';
import { Tag } from '@/types';

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
        <div>
            <Head title="Home" />

            <h1>Vim Vault</h1>
            <p>Discover NeoVim plugins</p>

            <section>
                <input type="text" />
                <ul>{tagItems}</ul>
            </section>
        </div>
    );
}
