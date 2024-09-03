import Sorter from './Sorter';
import { usePlugins, usePluginsDispatch } from '@/Context/PluginsContext';
import PluginCard from './PluginCard';
import { useAuthenticatedUser } from '@/Context/AuthenticatedUserContext';

export default function PluginCardSection() {
    const contextPlugins = usePlugins();
    const authenticatedUser = useAuthenticatedUser();
    const pluginsDispatch = usePluginsDispatch();

    return (
        <div>
            {contextPlugins.length > 1 && <Sorter />}
            <section className="space-y-12 mt-10">
                {contextPlugins.map((plugin) => (
                    <PluginCard
                        plugin={plugin}
                        key={plugin.id}
                        authenticatedUser={authenticatedUser}
                        dispatch={pluginsDispatch}
                    />
                ))}
            </section>
        </div>
    );
}
