
import Jwt from "jsonwebtoken";
import createError from "./error.js";


const verifyToken = (req, res, next) => {
    var token = req.cookies.access_token;
    if (!token) return next(createError(401, "you are not authenticated!"))
    Jwt.verify(token, process.env.Jwt, (err, user) => {

        if (err) return next(createError(403, "Token is not valid"))
        req.user = user;
        console.log(req.user)
        next();
    })

}
export default verifyToken;
