import PluginCard from '@/Components/PluginCard';
import PluginConfirmationPrompt from '@/Components/PluginConfirmationPrompt';
import Layout from '@/Layouts/Layout';
import { PageProps, Plugin, Tag } from '@/types';
import { useState } from 'react';

export default function PluginConfirm({
    auth,
    plugin,
    tags,
}: PageProps<{ plugin: Plugin; tags: Tag[] }>) {
    const [confirmed, setConfirmed] = useState(false);

    return (
        <Layout
            user={auth.user}
            title="Confim Plugin"
        >
            <PluginCard plugin={plugin} />
            {!confirmed && (
                <PluginConfirmationPrompt
                    onConfirmation={() => setConfirmed(true)}
                    id={plugin.id.toString()}
                />
            )}
            {confirmed && <p>select tag</p>}
        </Layout>
    );
}
