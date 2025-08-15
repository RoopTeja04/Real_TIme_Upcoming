import { useEffect, useState } from 'react';
import API from '../API/api';
import { useTheme } from '../Context_API/ThemeContext';

const AllData = () => {
    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState("user");
    const [loading, setLoading] = useState(true);
    const [searchedPerson, setSearchedPerson] = useState("");

    const { theme } = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await API.get("/admin/all");
                if (response.status !== 200) {
                    alert("Something went wrong! Please try again");
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

    const filteredData = data.filter(person =>
        person.role === activeTab &&
        (
            person.firstName.toLowerCase().includes(searchedPerson.toLowerCase()) ||
            person.lastName.toLowerCase().includes(searchedPerson.toLowerCase()) ||
            person.emailID.toLowerCase().includes(searchedPerson.toLowerCase())
        )
    );

    return (
        <>
            <div className="flex flex-wrap gap-3 mb-6 items-center">
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

                <input
                    value={searchedPerson}
                    onChange={(e) => setSearchedPerson(e.target.value)}
                    placeholder="Search by name or email..."
                    className={`rounded-md w-[60%] px-3 py-2 text-sm focus:outline-2 focus:outline-green-400 ${ theme ? 
                        "border-2 border-gray-300 text-white"  : "border-2 border-gray-800 text-black" } `}
                />
            </div>

            {loading ? (
                <div className="text-center py-6 text-gray-500 italic">
                    Fetching data...
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
                    <table className="min-w-full bg-white text-sm">
                        <thead>
                            <tr className="bg-gray-300 text-gray-700 uppercase text-xs tracking-wide">
                                <th className="py-4 px-2 text-center">Sl. No</th>
                                <th className="py-4 px-2 text-center">First Name</th>
                                <th className="py-4 px-2 text-center">Last Name</th>
                                <th className="py-4 px-2 text-center">Email ID</th>
                                <th className="py-4 px-2 text-center">Role</th>
                                <th className="py-4 px-2 text-center">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((person, index) => (
                                    <tr
                                        key={person.emailID}
                                        className="hover:bg-blue-200 transition-colors text-gray-900 cursor-pointer text-center"
                                    >
                                        <td className="py-4 px-2">{index + 1}</td>
                                        <td className="py-4 px-2 font-medium">{person.firstName}</td>
                                        <td className="py-4 px-2">{person.lastName}</td>
                                        <td className="py-4 px-2 text-gray-600">{person.emailID}</td>
                                        <td className="py-4 px-2 capitalize font-semibold text-green-600">
                                            {person.role}
                                        </td>
                                        <td>
                                            <button className="px-4 py-2.5 text-xs bg-red-500 text-white rounded hover:bg-red-600 tracking-wider font-semibold cursor-pointer">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-6 text-gray-600 italic font-semibold"
                                    >
                                        No data found for this role or search term.
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