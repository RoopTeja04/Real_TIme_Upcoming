import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

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
            <div className='border-1 border-black flex flex-col rounded-md'>
                <div className='flex flex-row items-center py-10 px-10 space-x-10'>
                    <FaUserCircle
                        size={84}
                    />
                    {
                        account ? (
                            <div className="">
                                <h2 className="text-xl font-bold">
                                    {account.firstName} {account.lastName}
                                </h2>
                                <p className=''>Email: {account.emailID}</p>
                                <p className='capitalize'>{account.role}</p>
                            </div>
                        ) : (
                            <p>Some Thing Went Wrong ! Please Try Again Later</p>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Account