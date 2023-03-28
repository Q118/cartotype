import { useContext, createContext, ReactNode, useEffect } from 'react';
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
    const [currentTheme, setCurrentTheme] = useLocalStorage<string>("cart-site-theme", "dark");

    useEffect(() => {
        if (currentTheme === "light") {
            setTheme("light");
        } else {
            setTheme("dark");
            // if its users first time, set it to dark
        }
    }, [currentTheme]);

    const getTheme = () => currentTheme;

    function setTheme(theme: string) {
        if (theme === "light") {
            document.documentElement.classList.remove('bg-dark', 'text-light');
            document.body.classList.remove('bg-dark', 'text-light');
            document.documentElement.classList.add('bg-light', 'text-dark');
            document.body.classList.add('bg-light', 'text-dark');
        } else {
            document.documentElement.classList.add('bg-dark', 'text-light');
            document.body.classList.add('bg-dark', 'text-light');
            document.documentElement.classList.remove('bg-light', 'text-dark');
            document.body.classList.remove('bg-light', 'text-dark');
        }
        setCurrentTheme(theme);
    }

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme, getTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}