const express = require("express")
const router = express.Router();
const { CreateAccount, Login, UpdatePassword } = require("../controllers/AuthController");

router.post("/create-account", CreateAccount)
router.post("/login", Login)
router.post("/update-password", UpdatePassword);

module.exports = router;