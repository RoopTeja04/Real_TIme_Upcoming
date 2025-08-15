import React, { useEffect, useState } from 'react';
import { useTheme } from '../Context_API/ThemeContext';
import { FiRefreshCcw } from "react-icons/fi";
import API from '../API/api';

const AdminHome = () => {

    const [counts, setCounts] = useState({
        users: 0,
        mentor: 0,
        instructor: 0,
        admin: 0,
    });

    const { theme } = useTheme();

    useEffect(() => {

        const FetchData = async () => {

            try {
                const response = await API.get("/admin/all")

                if (response.status !== 200)
                    return alert("Something went wrong ! please try again");

                const Data = response.data;

                setCounts({
                    users: Data.filter(u => u.role === "user").length,
                    mentor: Data.filter(u => u.role === "mentor").length,
                    instructor: Data.filter(u => u.role === "instructor").length,
                    admin: Data.filter(u => u.role === "admin").length,
                });

            }
            catch (err) {
                console.error(err)
            }

        }
        FetchData();
    }, []);

    const handleCountUsers = async () => {
        try {
            const response = await API.get("/admin/all")
            const studentData = response.data
            const CountStudents = studentData.filter(stu => stu.role === "user").length;
            setCounts(prev => ({
                ...prev, users: CountStudents
            }))
        }
        catch (err) {
            console.error(err)
        }
    }
    const handleCountAdmin = async () => {
        try {
            const response = await API.get("/admin/all")
            const studentData = response.data
            const CountStudents = studentData.filter(stu => stu.role === "admin").length;
            setCounts(prev => ({
                ...prev, admin: CountStudents
            }))
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleCountMentors = async () => {
        try {
            const response = await API.get("/admin/all")
            const studentData = response.data
            const CountStudents = studentData.filter(stu => stu.role === "mentor").length;
            setCounts(prev => ({
                ...prev, mentor: CountStudents
            }))
        }
        catch (err) {
            console.error(err)
        }
    }
    const handleCountInstructor = async () => {
        try {
            const response = await API.get("/admin/all")
            const studentData = response.data
            const CountStudents = studentData.filter(stu => stu.role === "instructor").length;
            setCounts(prev => ({
                ...prev, instructor: CountStudents
            }))
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-8">

                <div
                    className={`relative rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm border
                    ${theme ? "bg-gradient-to-br from-cyan-600 via-sky-500 to-blue-900 text-white border-white/20" : "bg-gradient-to-br from-cyan-300 via-sky-150 to-blue-400 text-gray-900 border-gray-200"}`}
                >
                    <button
                        onClick={handleCountUsers}
                        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 hover:rotate-180
                        ${theme ? "bg-white/20 hover:bg-white/30 text-white" : "bg-black/10 hover:bg-black/20 text-gray-800"} cursor-pointer`}
                    >
                        <FiRefreshCcw size={18} />
                    </button>
                    <span className="text-5xl font-extrabold drop-shadow-sm">{counts.users}</span>
                    <span className="mt-2 text-lg font-semibold tracking-wide">Users</span>
                </div>

                <div
                    className={`relative rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm border
                    ${theme ? "bg-gradient-to-br from-emerald-600 via-green-600 to-lime-900 text-white border-white/20" : "bg-gradient-to-br from-emerald-300 via-green-150 to-lime-400 text-gray-900 border-gray-200"}`}
                >
                    <button
                        onClick={handleCountMentors}
                        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 hover:rotate-180
                        ${theme ? "bg-white/20 hover:bg-white/30 text-white" : "bg-black/10 hover:bg-black/20 text-gray-800"} cursor-pointer`}
                    >
                        <FiRefreshCcw size={18} />
                    </button>
                    <span className="text-5xl font-extrabold drop-shadow-sm">{counts.mentor}</span>
                    <span className="mt-2 text-lg font-semibold tracking-wide">Mentors</span>
                </div>

                <div
                    className={`relative rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm border
                    ${theme ? "bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-900 text-white border-white/20" : "bg-gradient-to-br from-fuchsia-300 via-purple-150 to-indigo-400 text-gray-900 border-gray-200"}`}
                >
                    <button
                        onClick={handleCountInstructor}
                        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 hover:rotate-180
                        ${theme ? "bg-white/20 hover:bg-white/30 text-white" : "bg-black/10 hover:bg-black/20 text-gray-800"} cursor-pointer`}
                    >
                        <FiRefreshCcw size={18} />
                    </button>
                    <span className="text-5xl font-extrabold drop-shadow-sm">{counts.instructor}</span>
                    <span className="mt-2 text-lg font-semibold tracking-wide">Instructor</span>
                </div>

                <div
                    className={`relative rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm border
                    ${theme ? "bg-gradient-to-br from-rose-600 via-pink-600 to-red-900 text-white border-white/20" : "bg-gradient-to-br from-rose-300 via-pink-150 to-red-400 text-gray-900 border-gray-200"}`}
                >
                    <button
                        onClick={handleCountAdmin}
                        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 hover:rotate-180
                        ${theme ? "bg-white/20 hover:bg-white/30 text-white" : "bg-black/10 hover:bg-black/20 text-gray-800"} cursor-pointer`}
                    >
                        <FiRefreshCcw size={18} />
                    </button>
                    <span className="text-5xl font-extrabold drop-shadow-sm">{counts.admin}</span>
                    <span className="mt-2 text-lg font-semibold tracking-wide">Admins</span>
                </div>

            </div>

        </>
    );

}

export default AdminHome;