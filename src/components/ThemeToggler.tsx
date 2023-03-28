import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from '../context/ThemeContext';


export function ThemeToggler() {

    const { currentTheme, setTheme } = useTheme();


    return (
        <div
            className="rounded-circle"
            style={{
                width: "3rem",
                height: "3rem",
                padding: "0.5rem",
                position: "relative",
            }}
        >
            <DarkModeSwitch
                style={{ marginBottom: '2rem' }}
                checked={currentTheme !== "dark"}
                onChange={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                size={24}
                moonColor="black"
                sunColor="#FFF"
            />
        </div>
    );
}
