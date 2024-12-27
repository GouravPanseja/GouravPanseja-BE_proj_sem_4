const express = require("express");
const router = express.Router();

// import controllers
const {sendOtp,login,signup, getUser} = require("../controllers/controller.auth.js");

// authorisation
router.post("/sendOtp",sendOtp);                            // verified
router.post("/signup",signup); 

router.post("/login", login);

module.exports = router;
