const jwt = require("jsonwebtoken");

function generateTokenProvider(){
    const payload={
        sub: user["_id"],
        email: user.email,
        iat: Math.floor(Date.now()/1000), //this returns epoch time in s
        exp: Math.floor(Date.now()/1000) + parseInt(process.env.JWT_ACCESS_EXPIRATION_TTL),
    };

    return jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = generateTokenProvider;