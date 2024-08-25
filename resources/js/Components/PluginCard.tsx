import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Plugin as PluginProps } from '@/types';
import Tag from './Tag';
import Star from '@/SVG/Star';
import NewTab from '@/SVG/NewTab';

interface Props {
    plugin: PluginProps;
}
export default function PluginCard({ plugin }: Props) {
    dayjs.extend(relativeTime);

    return (
        <article className="bg-gray-100 text-gray-900 dark:text-gray-300 dark:bg-gray-800 sm:rounded-md shadow-lg dark:shadow-none sm:ring-1 ring-inset ring-gray-200 dark:ring-gray-700">
            <div className="dark:bg-gray-700 bg-gray-200 shadow-sm sm:rounded-t-md sm:flex sm:items-center sm:justify-between sm:gap-x-3 px-6 py-2">
                <div className="text-center sm:block sm:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-0">
                        <a
                            href={plugin.html_url}
                            className="flex items-center gap-1 justify-center hover:underline"
                            target="_blank">
                            {plugin.name}
                            <NewTab />
                        </a>
                    </h3>
                    <h5 className="dark:text-gray-400 text-gray-600">
                        by{' '}
                        <a
                            className="underline hover:font-bold"
                            href={`/author/${plugin.author.login}`}>
                            <img
                                height={18}
                                width={18}
                                src={plugin.author.avatar_url}
                                className="rounded inline mr-1"
                            />
                            {plugin.author.login}
                        </a>
                    </h5>
                </div>
                <div className="text-center flex justify-around mt-2 sm:mt-0 sm:block sm:text-right">
                    <p className="flex flex-col sm:block">
                        <span className="font-bold">Last Updated</span>{' '}
                        {dayjs(plugin.updated_at).fromNow()}
                    </p>
                    <p className="flex flex-col sm:block">
                        <span className="font-bold">Created</span>{' '}
                        {dayjs(plugin.created_at).fromNow()}
                    </p>
                </div>
            </div>
            <p className="text-lg sm:text-xl font-bold p-6 pb-3">
                {plugin.description}
            </p>
            <div className="sm:py-4 sm:flex sm:items-center">
                {plugin.tags && (
                    <ul className="px-6 flex flex-wrap gap-3 py-3 sm:py-0">
                        {plugin.tags.map((tag) => (
                            <Tag
                                key={tag.id}
                                tag={tag}
                                size="sm"
                                background="bg-gray-300 dark:bg-gray-700"
                            />
                        ))}
                    </ul>
                )}
                <p className="flex gap-3 bg-gradient-to-br from-blue-700 to-green-600 text-white w-max ml-auto px-8 py-1 rounded-tl sm:rounded-l font-bold">
                    {new Intl.NumberFormat('en-GB', {
                        notation: 'compact',
                    }).format(plugin.stargazers_count)}{' '}
                    <Star />
                </p>
            </div>
            {!!plugin.archived && (
                <p className="bg-[#ed8a19] text-black font-bold rounded-b-lg">
                    Archived
                </p>
            )}
        </article>
    );
}
