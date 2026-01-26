import { Request,Response,NextFunction } from "express"



export function validateCreateShift(req:Request,res:Response,next:NextFunction){
    const employee_id = Number(req.params.employee_id)
    const date = new Date(req.body.date);

    if(!(date instanceof Date) || isNaN(date.getTime())){
        return res.status(400).json({error:"Invalid date id"})
    }

    if(Number.isNaN(employee_id)){
        return res.status(400).json({error: "Invalid employee id"})
    }
    next();
}