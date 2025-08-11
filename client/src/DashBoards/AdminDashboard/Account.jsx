import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Account = () => {

    const [account, setAccount] = useState();

    const UserName = localStorage.getItem("username")

    useEffect(() => {
        const FetchAccount = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/admin/account/${UserName}`);
                setAccount(response.data);

            }
            catch (err) {
                if (err.response && err.response.status === 404) {
                    setError("User not found");
                } else {
                    setError("Error fetching account");
                }
            }
        }

        FetchAccount();
    })

    return (
        <>
            {account ? (
                <div className="mt-4 p-4">
                    <h2 className="text-xl font-bold">
                        {account.firstName} {account.lastName}
                    </h2>
                    <p>Email: {account.email}</p>
                    <p>Role: {account.role}</p>
                </div>
            ) : (
                <p className="mt-3 text-red-500"></p>
            )}

        </>
    )
}

export default Account