const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { validateUserOnLoginService } = require("../services/UserServices");
const { createJWT,attachCookiesToResponse } = require("../services/jwtService");

async function login(req,res,next){
    try {
        const {email,password}=req.body;
        console.log(req.body);
        if(!email || !password){
            throw new BadRequestError("both email and password is needed");
        }
        const tokenUser=await validateUserOnLoginService(email,password);
        console.log(tokenUser,"at controller");
        attachCookiesToResponse({ res, user:tokenUser });
        res.status(StatusCodes.OK).json({tokenUser});
    } catch (error) {
        next(next);
    }
}

module.exports={
    login
}

