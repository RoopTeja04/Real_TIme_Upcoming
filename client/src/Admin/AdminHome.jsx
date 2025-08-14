import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../Context_API/ThemeContext';
import { FiRefreshCcw } from "react-icons/fi";

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
                const response = await axios.get("http://localhost:5000/admin/all")

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
    })

    const handleCountUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/admin/all")
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
            const response = await axios.get("http://localhost:5000/admin/all")
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
            const response = await axios.get("http://localhost:5000/admin/all")
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
            const response = await axios.get("http://localhost:5000/admin/all")
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">

                <div
                    className={`relative rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center transition transform hover:scale-105
                    ${theme ? "bg-gradient-to-br from-blue-500 to-green-400 text-white" : "bg-gradient-to-br from-blue-200 to-green-100 text-black"}`}
                >
                    <button
                        onClick={handleCountUsers}
                        className={`absolute top-3 right-3 p-2 rounded-full transition
                        ${theme ? "bg-white/20 hover:bg-white/30 text-white" : "bg-black/10 hover:bg-black/20 text-black"} cursor-pointer`}
                    >
                        <FiRefreshCcw size={18} />
                    </button>
                    <span className="text-5xl font-bold">{counts.users}</span>
                    <span className="mt-2 text-lg font-medium">Users</span>
                </div>

                <div
                    className={`relative rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center transition transform hover:scale-105
                    ${theme ? "bg-gradient-to-br from-yellow-500 to-orange-400 text-white" : "bg-gradient-to-br from-yellow-200 to-orange-100 text-black"} `}
                >
                    <button
                        onClick={handleCountMentors}
                        className={`absolute top-3 right-3 p-2 rounded-full transition
                        ${theme ? "bg-white/20 hover:bg-white/30 text-white" : "bg-black/10 hover:bg-black/20 text-black"} cursor-pointer`}
                    >
                        <FiRefreshCcw size={18} />
                    </button>
                    <span className="text-5xl font-bold">{counts.mentor}</span>
                    <span className="mt-2 text-lg font-medium">Mentors</span>
                </div>

                <div
                    className={`relative rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center transition transform hover:scale-105
                    ${theme ? "bg-gradient-to-br from-purple-500 to-pink-400 text-white" : "bg-gradient-to-br from-purple-200 to-pink-100 text-black"}`}
                >
                    <button
                        onClick={handleCountInstructor}
                        className={`absolute top-3 right-3 p-2 rounded-full transition
                        ${theme ? "bg-white/20 hover:bg-white/30 text-white" : "bg-black/10 hover:bg-black/20 text-black"} cursor-pointer`}
                    >
                        <FiRefreshCcw size={18} />
                    </button>
                    <span className="text-5xl font-bold">{counts.instructor}</span>
                    <span className="mt-2 text-lg font-medium">Instructor</span>
                </div>

                <div
                    className={`relative rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center transition transform hover:scale-105
                    ${theme ? "bg-gradient-to-br from-red-500 to-pink-500 text-white" : "bg-gradient-to-br from-red-200 to-pink-100 text-black"}`}
                >
                    <button
                        onClick={handleCountAdmin}
                        className={`absolute top-3 right-3 p-2 rounded-full transition
                        ${theme ? "bg-white/20 hover:bg-white/30 text-white" : "bg-black/10 hover:bg-black/20 text-black"} cursor-pointer`}
                    >
                        <FiRefreshCcw size={18} />
                    </button>
                    <span className="text-5xl font-bold">{counts.admin}</span>
                    <span className="mt-2 text-lg font-medium">Admins</span>
                </div>

            </div>
        </>
    );

}

export default AdminHome;