import ThemeContext from '@/Context/ThemeContext';
import { useContext } from 'react';

export default function Bookmark({ isSaved }: { isSaved: boolean }) {
    const theme = useContext(ThemeContext);

    return (
        <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none"
        >
            <path
                opacity={isSaved ? '1' : '0.2'}
                d="M17 3C18.1046 3 19 3.89543 19 5L19 19.0536C19 20.5893 17.341 21.552 16.0077 20.7901L12.9923 19.067C12.3774 18.7157 11.6226 18.7157 11.0077 19.067L7.99228 20.7901C6.65897 21.552 5 20.5893 5 19.0536L5 5C5 3.89543 5.89543 3 7 3L17 3Z"
                fill={isSaved && theme === 'dark' ? '#c10' : 'currentColor'}
            />
            <path
                d="M17 3C18.1046 3 19 3.89543 19 5L19 19.0536C19 20.5893 17.341 21.552 16.0077 20.7901L12.9923 19.067C12.3774 18.7157 11.6226 18.7157 11.0077 19.067L7.99228 20.7901C6.65897 21.552 5 20.5893 5 19.0536L5 5C5 3.89543 5.89543 3 7 3L17 3Z"
                stroke={theme === 'dark' ? '#eaa' : '#333'}
                strokeWidth="1"
                strokeLinejoin="miter"
            />
        </svg>
    );
}
