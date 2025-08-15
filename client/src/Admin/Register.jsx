import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import API from "../API/api";

const Register = () => {
    const DefaultValues = {
        firstName: "",
        lastName: "",
        emailID: "",
        password: "",
        confirmPassword: "",
        role: "",
    };

    const [stage, setStage] = useState(1);
    const [formData, setFormData] = useState(DefaultValues);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNext = () => {
        if (stage === 1 && !formData.role) return setError("Please select a role");
        if (stage === 2 && (!formData.firstName || !formData.lastName || !formData.emailID))
            return setError("Please fill all fields");
        if (stage === 3) {
            if (!formData.password || !formData.confirmPassword)
                return setError("Please enter both password fields");
            if (formData.password !== formData.confirmPassword)
                return setError("Passwords do not match");
        }
        setError("");
        setStage((prev) => prev + 1);
    };

    const handleSubmit = async () => {
        if (!formData.role || !formData.firstName || !formData.lastName || !formData.emailID || !formData.password || !formData.confirmPassword) {
            return setError("All fields are required");
        }
        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        setError("");
        setLoading(true);
        try {
            const res = await API.post("/auth/create-account", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                emailID: formData.emailID,
                password: formData.password,
                role: formData.role,
            });

            if (res.status === 200) {
                setSuccess(true);
                setStage(4);
            } else {
                setError(res.data?.message || "Failed to create account. Please try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleMain = () => {
        setStage(1);
        setFormData(DefaultValues);
        setSuccess(false);
        setError("");
    };

    const inputClass = "w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition";
    const buttonClass = "px-5 py-2 rounded font-medium transition-all duration-200 cursor-pointer";

    return (
        <div className="flex flex-col justify-center items-center h-full text-black">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                {error && <div className="bg-red-100 border border-red-300 text-red-600 p-2 rounded mb-4 text-sm font-medium">{error}</div>}

                {stage === 1 && (
                    <>
                        <p className="mb-3 font-medium">Select Role</p>
                        <div className="flex gap-3">
                            {["user", "instructor", "mentor"].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setFormData((prev) => ({ ...prev, role }))}
                                    className={`${buttonClass} border ${formData.role === role
                                        ? "bg-blue-600 text-white border-blue-600 shadow"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                                        }`}
                                >
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleNext}
                                className={`${buttonClass} bg-blue-600 text-white hover:bg-blue-700`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {stage === 2 && (
                    <>
                        <input required name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className={inputClass} />
                        <input required name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className={inputClass} />
                        <input required type="email" name="emailID" value={formData.emailID} onChange={handleChange} placeholder="Email ID" className={inputClass} />
                        <div className="mt-6 flex justify-between">
                            <button onClick={() => setStage((prev) => prev - 1)} className={`${buttonClass} bg-gray-300 hover:bg-gray-400`}>Back</button>
                            <button onClick={handleNext} className={`${buttonClass} bg-blue-600 text-white hover:bg-blue-700`}>Next</button>
                        </div>
                    </>
                )}

                {stage === 3 && (
                    <>
                        <div className="relative mb-3">
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className={`${inputClass} pr-10`}
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <AiOutlineEyeInvisible className="text-black" size={24} /> : <AiOutlineEye className="text-black" size={24} />}
                            </span>
                        </div>

                        <div className="relative mb-3">
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className={`${inputClass} pr-10`}
                            />
                            <span
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? <AiOutlineEyeInvisible className="text-black" size={24} /> : <AiOutlineEye className="text-black" size={24} />}
                            </span>
                        </div>

                        <div className="mt-6 flex justify-between">
                            <button onClick={() => setStage((prev) => prev - 1)} className={`${buttonClass} bg-gray-300 hover:bg-gray-400`}>Back</button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`${buttonClass} text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                                    }`}
                            >
                                {loading ? "Creating..." : "Create Account"}
                            </button>
                        </div>
                    </>
                )}

                {stage === 4 && success && (
                    <div className="text-center">
                        <p className="text-lg font-semibold text-green-600">✅ Account Created!</p>
                        <p className="mt-2 text-gray-600">Role: {formData.role}</p>
                        <p className="text-gray-600">
                            {formData.firstName} {formData.lastName} — {formData.emailID}
                        </p>
                        <button onClick={handleMain} className={`${buttonClass} mt-4 bg-blue-600 text-white hover:bg-blue-700`}>
                            Fill Another
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;