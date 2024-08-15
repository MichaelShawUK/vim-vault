export default function HeaderActions() {
    return (
        <div className="font-bold space-x-8 text-lg pl-4">
            <a
                href="/login"
                className="hover:text-gray-500 dark:hover:text-gray-400">
                Log In
            </a>
            <a
                href="/register"
                className="bg-gradient-to-br from-blue-700 to-green-600 text-white px-4 py-3 rounded-lg hover:from-indigo-600 hover:to-indigo-600">
                Sign Up
            </a>
        </div>
    );
}
