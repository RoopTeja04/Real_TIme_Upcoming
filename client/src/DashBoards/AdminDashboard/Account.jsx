import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Account = () => {

    const [account, setAccount] = useState(null);

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
        <div>Account {account.firstName}, {account.lastName}</div>
    )
}

export default Account