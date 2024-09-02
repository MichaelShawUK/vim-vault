import Sorter from './Sorter';
import { usePlugins } from '@/Context/PluginsContext';
import PluginCard from './PluginCard';

export default function PluginCardSection() {
    const contextPlugins = usePlugins();

    //TODO: Extract state and dispatch into separate contexts
    //https://react.dev/learn/scaling-up-with-reducer-and-context#step-1-create-the-context

    return (
        <div>
            {contextPlugins.length > 1 && <Sorter />}
            <section className="space-y-12 mt-10">
                {contextPlugins.map((plugin) => (
                    <PluginCard
                        plugin={plugin}
                        key={plugin.id}
                    />
                ))}
            </section>
        </div>
    );
}
