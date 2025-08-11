import { Outlet, Link } from 'react-router-dom';
import { FaUser, FaSun, FaMoon, FaHome, FaSearch, FaCog } from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useTheme } from '../Context_API/ThemeContext';
import { useState } from 'react';
import { FaUserPlus } from "react-icons/fa";

const Admin = () => {
    const UserName = localStorage.getItem("username");
    const { theme, handleThemeSwitcher } = useTheme();
    const [showNav, setShowNav] = useState(false);

    const handleToggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <div className={`flex h-screen ${theme ? "text-white" : "text-black"}` }>
            <div
                className={`h-full ${showNav ? "w-48" : "w-20"} 
                flex flex-col px-3.5 py-8 border-r-2
                ${theme ? "bg-gray-900 text-white border-gray-200 items-start" : "bg-white text-black border-gray-800 items-start"}
                transition-all duration-900 ease-in-out`}
            >
                <button
                    onClick={handleToggleNav}
                    className="mb-6 px-4 text-sm font-semibold cursor-pointer"
                >
                    {showNav ? <MdKeyboardDoubleArrowLeft size={24} /> : <MdKeyboardDoubleArrowRight size={24} />}
                </button>
                <nav className="flex flex-col gap-6 px-4 space-y-2 mt-4 ">
                    <Link to="home" className="flex items-center gap-3 hover:opacity-80">
                        <FaHome size={24} /> {showNav && <span>Home</span>}
                    </Link>
                    <Link to="register" className="flex items-center gap-3 hover:opacity-80" >
                        <FaUserPlus size={24} /> { showNav && <span>Register</span> }
                    </Link>
                </nav>
            </div>

            <div className="flex flex-col flex-1">
                <div
                    className={`h-16 flex items-center bg-green-700 ${theme ? "text-gray-300" : "text-black"
                        } transition-colors duration-500 ease-in-out`}
                >
                    <div className="flex flex-row px-6 w-full justify-between">
                        <Link to="/admin" className="tracking-wide text-lg">
                            Admin Panel
                        </Link>
                        <p className="tracking-wide text-lg">Welcome, {UserName}</p>
                        <div className="flex flex-row items-center space-x-6">
                            <Link to="account">
                                <FaUser size={20} />
                            </Link>
                            <button
                                onClick={handleThemeSwitcher}
                                className="cursor-pointer transition-transform duration-300 hover:scale-110"
                            >
                                {theme ? <FaSun size={20} /> : <FaMoon size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`flex-1 ${theme ? "bg-gray-900" : "bg-gray-200"
                        } transition-colors duration-500 ease-in-out p-6`}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Admin;