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
        <article className="bg-gray-200 text-gray-900 dark:text-gray-300 dark:bg-gray-800 rounded-lg ring-1 ring-inset ring-gray-300 dark:ring-gray-600">
            <div className="dark:bg-gray-700 bg-gray-300 rounded-t-lg flex items-center justify-between px-6 py-2">
                <div className="text-left">
                    <h3 className="text-3xl font-bold">
                        <a
                            href={plugin.html_url}
                            className="flex items-center gap-1 hover:underline"
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
                <div className="text-right">
                    <p>
                        <span className="font-bold">Last Updated</span>:{' '}
                        {dayjs(plugin.updated_at).fromNow()}
                    </p>
                    <p>
                        <span className="font-bold">Created</span>{' '}
                        {dayjs(plugin.created_at).fromNow()}
                    </p>
                </div>
            </div>
            <p className="text-xl font-bold p-6">{plugin.description}</p>
            <div className="pt-4 pb-4 pl-6 flex items-center">
                <ul className="flex">
                    {plugin.tags.map((tag) => (
                        <Tag
                            key={tag.id}
                            tag={tag}
                        />
                    ))}
                </ul>
                <p className="flex gap-3 bg-gradient-to-br from-blue-700 to-green-600 text-white w-max ml-auto px-8 py-1 rounded-l font-bold">
                    {new Intl.NumberFormat('en-GB', {
                        notation: 'compact',
                    }).format(plugin.stargazers_count)}{' '}
                    <Star />
                </p>
            </div>
        </article>
    );
}
