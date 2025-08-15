import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API/api";

const ForgotPassWord = () => {

    const DefaultValues = {
        email: "",
        newPassword: "",
        confirmPassword: "",
    }

    const [visible, setVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState(DefaultValues);

    const navigate = useNavigate();

    const handleToggoleVisible = () => {
        setVisible(!visible);
    }

    const handleToggleConfirmVisible = () => {
        setConfirmVisible(!confirmVisible);
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {

            if (formData.confirmPassword !== formData.newPassword)
                return alert("Password not Matched!");

            const response = await API.post("/auth/update-password", { emailID: formData.email, password: formData.confirmPassword });

            if (response.status === 200) {
                alert("Password changed Successfully");
                navigate("/")
            }

            setFormData(DefaultValues)

        }
        catch (err) {
            console.error(err)
            alert("Some thing went wrong. Try again after some time!")
        }

    }

    return (
        <>
            <div
                className="flex items-center justify-center min-h-screen bg-cover bg-center relative px-4"
                style={{
                    backgroundImage:
                        "url('https://media.firstbusiness.bank/image/upload/q_auto/new-site/five-tips-choosing-password-manager.jpg')",
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/65"></div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-10 backdrop-blur-lg bg-white/10 text-white 
                   w-full sm:w-[70%] md:w-[50%] lg:w-[35%] xl:w-[25%]
                   p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col items-center space-y-6 border border-white/20"
                >
                    <p
                        onClick={() => navigate("/")}
                        className="absolute top-4 left-6 sm:top-6 sm:left-8 text-xs sm:text-sm text-gray-950 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
                    >
                        Back to Login
                    </p>

                    <h2 className="text-2xl sm:text-3xl font-bold tracking-wide mt-10 sm:mt-12">Forgot Password</h2>
                    <p className="text-gray-200 text-xs sm:text-sm">Reset your password here</p>

                    <div className="flex flex-col w-full space-y-6 relative">
                        {/* Email */}
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            className="bg-transparent border-b-2 border-gray-300 focus:border-white outline-none px-2 py-2 placeholder-gray-300 text-white text-sm sm:text-base"
                            placeholder="Email ID"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        {/* New Password */}
                        <div className="relative">
                            <input
                                type={visible ? "text" : "password"}
                                className="bg-transparent border-b-2 border-gray-300 focus:border-white outline-none w-full px-2 py-2 placeholder-gray-300 text-white text-sm sm:text-base"
                                placeholder="New Password"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            />
                            <motion.button
                                whileTap={{ scale: 0.85 }}
                                className="absolute right-2 top-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                                onClick={handleToggoleVisible}
                            >
                                {visible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </motion.button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <input
                                type={confirmVisible ? "text" : "password"}
                                className="bg-transparent border-b-2 border-gray-300 focus:border-white outline-none w-full px-2 py-2 placeholder-gray-300 text-white text-sm sm:text-base"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                            <motion.button
                                whileTap={{ scale: 0.85 }}
                                className="absolute right-2 top-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                                onClick={handleToggleConfirmVisible}
                            >
                                {confirmVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </motion.button>
                        </div>
                    </div>

                    {/* Reset Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleForgotPassword}
                        className="w-full bg-indigo-500/80 hover:bg-indigo-500 px-4 py-2 rounded-lg shadow-lg font-semibold text-white transition-all cursor-pointer text-sm sm:text-base"
                    >
                        Reset Password
                    </motion.button>
                </motion.div>
            </div>
        </>
    )
}

export default ForgotPassWord