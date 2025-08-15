import axios from "axios";

const token = localStorage.getItem("Token")

const API = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}`})
    },
});

export default API;