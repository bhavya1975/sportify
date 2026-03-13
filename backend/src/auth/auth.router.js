const express = require("express");
const authController = require("./auth.controller.js");
const {StatusCodes} = require("http-status-codes");
const {validationResult} = require("express-validator");
const loginValidator = require("./validators/login.validator.js");

const authRouter = express.Router();


/**
 * @swagger
 * 
 * /auth/login:
 *  post:
 *    summary: User Login
 *    tags: [Authentication]
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema: 
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200: 
 *        description: User login successfully
 *        content: 
 *          application/json:
 *            example: 
 *              status: success
 *              statusCode: 200
 *              message: Ok 
 *              data: 
 *                accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTc0ZmM0OGVkNTVkMTY5NWZjNmJmNWMiLCJlbWFpbCI6InByYW5lbEBtYWlsLmNvbSIsImlhdCI6MTc2OTI3NTM4NiwiZXhwIjoxNzY5MzYxNzg2fQ.kC5anoin75ctxI3B2-GsqAVjZW28uj7-Wy8T6j0Z8CE
 */

authRouter.post("/login", loginValidator, (req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){
        return authController.handleLogin(req,res);
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

module.exports = authRouter;

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *   Login:
 *    type: object
 *    required: 
 *      - email
 *      - password
 *    properties: 
 *      email:
 *        type: String
 *        description: A valid email address
 *      password:
 *        type: String
 *        description: Must contain atleast 8 characters and also a number, a capital letter and a special letter
 *    example:
 *      email: pranel.ag@email.com
 *      password: Pranel@2
 *  */