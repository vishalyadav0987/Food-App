const jwt = require('jsonwebtoken');


const protectedRouteMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "UnAuthorized - User!" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECERET);
        console.log(token_decode);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log("Error in protectedRouteMiddleware Function->",error);
        return res.json({ success: false, message: error.message });
    }
}

module.exports = protectedRouteMiddleware;