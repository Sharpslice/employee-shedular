import { Request,Response,NextFunction } from "express"
import { DateTime } from "luxon";



export function validateUpdateShiftTime(req:Request,res:Response,next:NextFunction){
    const employee_id = Number(req.params.employee_id);
    const shift_id = Number(req.params.shift_id)


    const {start_time,end_time,date} = req.body;

    if(start_time!= undefined){
        const start = DateTime.fromISO(start_time);
        
        if(!start.isValid){
            console.log('not valuid')
            return res.status(400).json({error: "Invalid ISO start time"})
        }
    }

    if(end_time != undefined){
        const end = DateTime.fromISO(end_time);
        if(!end.isValid){
            return res.status(400).json({error: "Invalid ISO end time"})
        }
    }

    if(date != undefined){
        const dateDt = DateTime.fromISO(date);
       if(!dateDt.isValid){
            return res.status(400).json({error: "Invalid ISO date time"})
       }
    }
    if(Number.isNaN(employee_id)){
        return res.status(400).json({error: "Invalid employee id"})
    }
    if(Number.isNaN(shift_id)){
        return res.status(400).json({error:"Invalid shift id"})
    }

    next();
}