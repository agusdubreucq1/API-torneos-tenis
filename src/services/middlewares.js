import pkg from "jsonwebtoken";
// const { jwt } = pkg;
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();



export const isLoggedIn = (req, res, next) => {
    let token = req.headers.authorization;
    token = token?.replace('Bearer ', '');

    if(token == null) return res.sendStatus(403);

    console.log(token, process.env.JWT_SECRET)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = {...user, password: ""};
        next();
    });

}