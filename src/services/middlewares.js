import pkg from "jsonwebtoken";
// const { jwt } = pkg;
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();



export const isLoggedIn = (req, res, next) => {
    let token = req.headers.authorization;
    token = token?.replace('Bearer ', '');


    if(token == null) return res.status(403).json({message: "No tenes los permisos"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "No tenes los permisos", error: "no tienes los permisos"});

        req.user = {...user, password: ""};
        next();
    });

}