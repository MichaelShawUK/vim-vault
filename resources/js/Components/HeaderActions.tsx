import AccountDropdown from './AccountDropdown';

function LoginButton() {
    return (
        <a
            href="/login"
            className="hover:text-gray-500 dark:hover:text-gray-400">
            Log In
        </a>
    );
}

export default function HeaderActions() {
    const auth = true;

    return (
        <div className="space-x-8 pl-4">
            {auth ? <AccountDropdown /> : <LoginButton />}
        </div>
    );
}
