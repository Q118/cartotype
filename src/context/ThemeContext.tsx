import { useContext, createContext, ReactNode, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppingCartProviderProps = {
    children: ReactNode;
};


type ThemeContext = {
    currentTheme: string;
    setTheme: (theme: string) => void;
    getTheme: () => string;
};

const ThemeContext = createContext({} as ThemeContext);

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: ShoppingCartProviderProps) {
    const [currentTheme, setCurrentTheme] = useState<string>("dark");

    const getTheme = () => currentTheme;

    const setTheme = (theme: string) => {
        setCurrentTheme(theme);
    }

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme, getTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}