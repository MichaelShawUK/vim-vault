import { PropsWithChildren } from 'react';

export default function PluginCardSection({ children }: PropsWithChildren) {
    return <section className="space-y-12">{children}</section>;
}
