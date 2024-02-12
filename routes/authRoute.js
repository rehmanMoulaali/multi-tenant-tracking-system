const { Router } = require("express");
const { login } = require("../controller/authController");

const authRouter=Router();
authRouter.post('/login',login);

module.exports=authRouter;

