import { createContext } from "react";

const ThemeContext = createContext<'dark' | 'light'>('dark');

export default ThemeContext;
