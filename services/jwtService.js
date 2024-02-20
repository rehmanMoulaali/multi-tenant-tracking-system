const jwt = require('jsonwebtoken');
require('dotenv').config({path:'../.env'})
/**
* Creates a JSON Web Token (JWT) using the provided payload.
*
* @param {{}} payload The payload to be signed into the JWT.
* @returns {string} The generated JWT.
*/
const createJWT = ({ payload }) => {
 const token = jwt.sign(payload, process.env.JWT_SECRET, {
   expiresIn: process.env.JWT_LIFETIME,
 });
 return token;
};

/**
* Verifies if a given token is valid.
*
* @param {{ token: string }} param0 The token to be verified.
* @returns {boolean} True if the token is valid, false otherwise.
*/
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

/**
* Attaches cookies to the response object.
*
* @param {{res: Response, user: User}} param0 The response object and the user object.
*/
const attachCookiesToResponse = ({ res, user }) => {
   console.log(user,"at cookies");
  const token = createJWT({ payload: user });
  console.log(token);
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};