
import { Request,Response,NextFunction } from "express"


export function validateMoveShift(req:Request,res:Response,next:NextFunction){
    const shift_id = Number(req.params.id);
    const employee_id = Number(req.body.employee_id)
    const date = new Date(req.body.date);


    if(Number.isNaN(shift_id)){
        return res.status(400).json({error:"Invalid shift id"})
    }

    if(Number.isNaN(employee_id)){
        return res.status(400).json({error:"Invalid employee id"})
    }
    if(!(date instanceof Date) || isNaN(date.getTime())){
        return res.status(400).json({error:"Invalid date id"})
    }
    next();
}