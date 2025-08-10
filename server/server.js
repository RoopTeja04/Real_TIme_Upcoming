const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv").config();
const AuthRoutes = require("./routes/AuthRoutes");
const AdminRoutes = require("./routes/AdminRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("The Server is Running Properly")
})

app.use("/auth", AuthRoutes)

app.use("/admin", AdminRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.error(err))

app.listen( process.env.PORT || 5000, () => console.log("The Port is Connected to 5000"))