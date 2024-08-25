import { usePage } from '@inertiajs/react';

export default function Hello() {
    const page = usePage();
    console.log(page);

    return (
        <div>
            <h1>Hello world</h1>
        </div>
    );
}
