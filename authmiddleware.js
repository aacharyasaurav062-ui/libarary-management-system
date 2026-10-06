const jwt = require("jsonwebtoken");
const authmiddleware = (req,res, next) => {
     const authHeader =
     req.headers.authorization;
     if (!authHEADER) {
        return res.status(401).json({
            sucess:false,
            message:"Authorization token required"
        });
     }
     const token = authHeader.split(" ")[1];
     try {
        const decoded = jwt.verify(token, process.env.jwt_SECRET);
        req.user = decoded;
        next();
     } catch (error) {
        return res.status(401).json({
            sucess:false,
            message:"Invalid or expired token"
        });
     }
};
module.exports = authmiddleware;