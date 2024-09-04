import { User } from '@/types';
import AccountDropdown from './AccountDropdown';

function LoginButton() {
    return (
        <a
            href="/login"
            className="font-semibold hover:text-gray-500 dark:hover:text-gray-400"
        >
            Log In
        </a>
    );
}

export default function HeaderActions({ user }: { user: User | null }) {
    return (
        <div className="pl-8">
            {user ? <AccountDropdown /> : <LoginButton />}
        </div>
    );
}
