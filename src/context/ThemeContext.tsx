import { useContext, createContext, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Theme } from 'react-toastify';


type ShoppingCartProviderProps = {
    children: ReactNode;
};


type ThemeContext = {
    currentTheme: Theme;
    setTheme: (theme: Theme) => void;
    getTheme: () => string;
    isDark: () => boolean;
};

const ThemeContext = createContext({} as ThemeContext);

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: ShoppingCartProviderProps) {
    const [currentTheme, setCurrentTheme] = useLocalStorage<Theme>("cart-site-theme", "dark");

    useEffect(() => {
        if (currentTheme === "light") {
            setTheme("light");
        } else {
            setTheme("dark");
            // if its users first time, set it to dark
        }
    }, [currentTheme]);


    const getTheme = () => currentTheme;
    const isDark = () => currentTheme === "dark";


    function setTheme(theme: Theme) {
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
        <ThemeContext.Provider value={{ currentTheme, setTheme, getTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
}