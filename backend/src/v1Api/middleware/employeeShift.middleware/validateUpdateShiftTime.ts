import { Request,Response,NextFunction } from "express"



export function validateUpdateShiftTime(req:Request,res:Response,next:NextFunction){
    const employee_id = Number(req.params.employee_id);
    const shift_id = Number(req.params.shift_id)
    if(Number.isNaN(employee_id)){
        return res.status(400).json({error: "Invalid employee id"})
    }
    if(Number.isNaN(shift_id)){
        return res.status(400).json({error:"Invalid shift id"})
    }

    next();
}