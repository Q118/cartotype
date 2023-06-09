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
            document.documentElement.classList.remove('cart-bg-dark');
            document.body.classList.remove('cart-bg-dark');
            document.documentElement.classList.add('cart-bg-light');
            document.body.classList.add('cart-bg-light');
        } else {
            document.documentElement.classList.add('cart-bg-dark');
            document.body.classList.add('cart-bg-dark');
            document.documentElement.classList.remove('cart-bg-light');
            document.body.classList.remove('cart-bg-light');
        }
        setCurrentTheme(theme);
    }

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme, getTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
}