import Sorter from './Sorter';
import PluginCard from './PluginCard';
import { usePlugins, usePluginsDispatch } from '@/Context/PluginsContext';
import { useAuthenticatedUser } from '@/Context/AuthenticatedUserContext';
import { Link } from '@inertiajs/react';

export default function PluginCardSection({ heading }: { heading?: string }) {
    const plugins = usePlugins();
    const authenticatedUser = useAuthenticatedUser();
    const pluginsDispatch = usePluginsDispatch();

    return (
        <div>
            <div className="flex flex-col items-center gap-6 sm:flex-row justify-between">
                <h3 className="font-bold text-lg">{heading}</h3>
                {plugins.length > 1 && <Sorter />}
            </div>
            <section className="space-y-12 mt-10">
                {plugins.map((plugin) => (
                    <PluginCard
                        plugin={plugin}
                        key={plugin.id}
                        authenticatedUser={authenticatedUser}
                        dispatch={pluginsDispatch}
                    />
                ))}
                {plugins.length === 0 && (
                    <>
                        <p className="mb-3">There are no matching plugins. </p>
                        <Link
                            href="/"
                            className="font-bold underline"
                        >
                            View all
                        </Link>
                    </>
                )}
            </section>
        </div>
    );
}
