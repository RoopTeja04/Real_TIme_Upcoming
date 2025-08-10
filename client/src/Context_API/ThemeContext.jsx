import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("Theme");
        if (savedTheme !== null) {
            setTheme(savedTheme === "true")
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("Theme", theme ? "true" : "false");
    }, [theme]);

    const handleThemeSwitcher = () => {
        setTheme(prevTheme => !prevTheme);
    };

    return (
        <ThemeContext.Provider value={{ handleThemeSwitcher, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};