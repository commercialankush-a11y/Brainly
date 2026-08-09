import type { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_password } from "./config.js";


export const userMiddleware= (req : Request,res: Response,next: NextFunction) =>{
const header = req.headers["authorization"];

const decoded = jwt.verify(header as string,JWT_password)

if(decoded){
    //@ts-ignore
    req.userId = decoded.id;
    next();
}else{
    res.status(403).json({msg:"invalid"})
}
}