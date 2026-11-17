const express=require('express')
const router=express.Router();
const {login,register,refreshAccessToken}=require("../controllers/auth.js")

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/refresh').post(refreshAccessToken);

module.exports=router