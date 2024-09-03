import { Tag as TagProps } from '@/types';
import Tag from './Tag';

export default function PopularTags({ tags }: { tags: TagProps[] }) {
    return (
        <section className="my-14 sm:my-20">
            <h3 className="uppercase font-bold text-lg sm:text-xl tracking-[0.4em] mb-4">
                Popular Tags
            </h3>
            <ul className="flex gap-x-3 gap-y-5 px-2 sm:gap-6 sm:px-10 flex-wrap justify-center pt-4">
                {tags.map((tag) => (
                    <Tag
                        key={tag.id}
                        tag={tag}
                    />
                ))}
            </ul>
        </section>
    );
}
