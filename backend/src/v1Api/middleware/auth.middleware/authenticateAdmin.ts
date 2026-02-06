import { Request,Response,NextFunction } from "express"
import { Employee } from "../../../generated/prisma";
interface AuthenticatedUser extends Employee{}
export function authenticateAdmin( req:Request,res:Response,next:NextFunction){
    const user = req.user as AuthenticatedUser
   
    if(!user){
        console.log('user is not logged in')
        return res.status(401).json({error:'user is not logged in'})
    }
    if((user.role) !== 'ADMIN' ){
        console.log('user is not an admin')
        return res.status(403).json({error:'user is not an admin'})
    }
    next()


}