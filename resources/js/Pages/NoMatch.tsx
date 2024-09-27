import PluginCardSection from '@/Components/PluginCardSection';
import SiteLayout from '@/Layouts/SiteLayout';
import pluginReducer from '@/Reducers/plugins';
import { PageProps } from '@/types';
import { useReducer } from 'react';
import { usePage } from '@inertiajs/react';

export default function NoMatch({ auth }: PageProps) {
    const [pluginsState, dispatch] = useReducer(pluginReducer, []);
    const page = usePage();
    const [category, query] = page.url.split('/').slice(-2);

    return (
        <SiteLayout
            title="No Match"
            auth={auth}
            plugins={pluginsState}
            dispatch={dispatch}
        >
            <PluginCardSection
                heading={`No match for ${category} - ${query}`}
            />
        </SiteLayout>
    );
}
