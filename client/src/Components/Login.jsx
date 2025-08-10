import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";

const Login = () => {

    const navigate = useNavigate();

    const DefaultValues = { emailID: "", passWord: "" }

    const [visible, setVisible] = useState(false);
    const [userDetails, setUserDetails] = useState(DefaultValues);

    const handleToggoleVisible = () => {
        setVisible(!visible);
    }

    const handleLogin = async () => {

        try {
            const response = await axios.post("http://localhost:5000/auth/login", {
                emailID: userDetails.emailID,
                password: userDetails.passWord
            })

            const Data = response.data;

            if (Data) {
                localStorage.setItem("Logined", true);
                localStorage.setItem("Token", Data.token);

                if (Data.role === "user") {
                    navigate("/user");
                } else if (Data.role === "mentor") {
                    navigate("/mentor");
                } else if (Data.role === "instructor") {
                    navigate("/instructor");
                } else {
                    navigate("/admin");
                }

                setUserDetails(DefaultValues)
            }

        }
        catch (err) {
            console.error(err);
            alert("Login failed");
        }

    }

    return (
        <>
            <div
                className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.squarespace-cdn.com/content/v1/554b8150e4b01cb58c517c75/1726074926880-VG56O3XRWWJDUS9OX2DB/image-asset.jpeg')",
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-10 backdrop-blur-lg bg-white/10 text-white 
                   w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] xl:w-[25%]
                   p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col items-center space-y-6 border border-white/20"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-wide">Welcome Back</h2>
                    <p className="text-gray-200 text-sm sm:text-md">Login to continue</p>

                    <div className="flex flex-col w-full space-y-6 relative">
                        {/* Email */}
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            className="bg-transparent border-b-2 border-gray-300 focus:border-white outline-none px-2 py-2 placeholder-gray-300 text-white"
                            placeholder="Email ID"
                            value={userDetails.emailID}
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, emailID: e.target.value })
                            }
                        />

                        {/* Password */}
                        <motion.div
                            className="relative"
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <input
                                type={visible ? "text" : "password"}
                                className="bg-transparent border-b-2 border-gray-300 focus:border-white outline-none w-full px-2 py-2 placeholder-gray-300 text-white"
                                placeholder="Password"
                                value={userDetails.passWord}
                                onChange={(e) =>
                                    setUserDetails({ ...userDetails, passWord: e.target.value })
                                }
                            />
                            <motion.button
                                whileTap={{ scale: 0.85 }}
                                className="absolute right-2 top-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                                onClick={handleToggoleVisible}
                            >
                                {visible ? (
                                    <AiOutlineEyeInvisible size={22} />
                                ) : (
                                    <AiOutlineEye size={22} />
                                )}
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Forgot Password */}
                    <motion.p
                        onClick={() => navigate("/login/forgot-password")}
                        className="text-md cursor-pointer hover:underline"
                    >
                        Forgot Password?
                    </motion.p>

                    {/* Login Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogin}
                        className="w-full bg-indigo-500/80 hover:bg-indigo-500 px-4 py-2 rounded-lg shadow-lg font-semibold text-white transition-all cursor-pointer"
                    >
                        Login
                    </motion.button>
                </motion.div>
            </div>
        </>
    )
}

export default Login