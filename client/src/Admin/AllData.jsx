import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllData = () => {
    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState("user");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/admin/all");

                if (response.status !== 200) {
                    alert("Something went wrong! Please try again");
                    setLoading(false);
                    return;
                }

                setData(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); 

    const filteredData = data.filter(person => person.role === activeTab);

    return (
        <>
            <div className="flex gap-3 mb-6">
                {["user", "mentor", "instructor", "admin"].map((role) => (
                    <button
                        key={role}
                        onClick={() => setActiveTab(role)}
                        className={`px-5 py-2 rounded-md font-medium transition-all duration-300 border
                            ${activeTab === role
                                ? "bg-blue-600 text-white shadow-md border-blue-600"
                                : "bg-white text-gray-600 border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                            } cursor-pointer`}
                    >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-6 text-gray-500 italic">
                    Fetching data...
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
                    <table className="min-w-full bg-white text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                                <th className="py-3 px-4 text-left">Sl. No</th>
                                <th className="py-3 px-4 text-left">First Name</th>
                                <th className="py-3 px-4 text-left">Last Name</th>
                                <th className="py-3 px-4 text-left">Email ID</th>
                                <th className="py-3 px-4 text-left">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((person, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-blue-200 transition-colors text-gray-900 cursor-pointer"
                                    >
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4 font-medium">{person.firstName}</td>
                                        <td className="py-3 px-4">{person.lastName}</td>
                                        <td className="py-3 px-4 text-gray-600">{person.emailID}</td>
                                        <td className="py-3 px-4 capitalize font-semibold text-green-600">
                                            {person.role}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-6 text-gray-500 italic"
                                    >
                                        No data found for this role.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default AllData;