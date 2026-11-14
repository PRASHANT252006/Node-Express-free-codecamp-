const express=require('express');
const route=express.Router();
const {login, dashboard}=require('../controller/main.js');
const authMiddleware=require('../middleware/auth.js');

route.route('/login').post(login);
route.route('/dashboard').get(authMiddleware, dashboard);

module.exports=route;