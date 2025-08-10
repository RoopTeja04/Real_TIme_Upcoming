import React, { useEffect, useState } from 'react'
import axios from "axios";

const AllData = () => {

    const [users, setUsers] = useState(0);
    const [mentor, setMentor] = useState(0);
    const [instructor, setInstructor] = useState(0);
    const [admin, setAdmin] = useState(0);

    useEffect(() => {

        const FetchData = async () => {

            try {
                const response = await axios.get("http://localhost:5000/admin/all")

                if (response.status !== 200)
                    return alert("Something went wrong ! please try again");

                const Data = response.data;

                const CountUsers = Data.filter(users => users.role === "user").length;
                const CountMentor = Data.filter(users => users.role === "mentor").length;
                const CountInstructor = Data.filter(users => users.role === "instructor").length;
                const CountAdmin = Data.filter(users => users.role === "admin").length;

                setUsers(CountUsers);
                setMentor(CountMentor);
                setInstructor(CountInstructor);
                setAdmin(CountAdmin);

            }
            catch (err) {
                console.error(err)
            }

        }

        FetchData();

    }, [])

    const handleCountUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/admin/all")
            const studentData = response.data
            const CountStudents = studentData.filter(stu => stu.role === "user").length;
            setUsers(CountStudents)
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
            setAdmin(CountStudents)
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
            setMentor(CountStudents)
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
            setInstructor(CountStudents)
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div>
                <p>Users: {users} <button onClick={handleCountUsers}> Refersh</button></p>
                <p>Mentors: {mentor} <button onClick={handleCountMentors}> Refersh</button></p>
                <p>Instructor: {instructor} <button onClick={handleCountInstructor}> Refersh</button></p>
                <p>Admins: {admin} <button onClick={handleCountAdmin}> Refersh</button></p>
            </div>
        </>
    )
}

export default AllData