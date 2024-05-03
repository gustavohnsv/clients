import { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode  } from "react-icons/md";


export default function DarkMode() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') !== 'dark' ? 'light' : 'dark');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleSwitch = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <button className="absolute top-8 right-8 bg-gray-600 p-2 rounded-full outline-none shadow-lg hover:scale-110 duration-300" onClick={handleSwitch}>
            { theme === 'light' ? <MdDarkMode size={25} color="#FFF"/> : <MdLightMode size={25} color="#FFFF00"/> }
        </button>
    );
}