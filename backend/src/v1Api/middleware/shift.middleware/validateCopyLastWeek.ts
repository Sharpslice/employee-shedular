import { Request,Response,NextFunction } from "express"
import { DateTime } from "luxon";

export function validateCopyLastWeekShift(req:Request,res:Response,next:NextFunction){
    const {lastWeekArray} = req.body
    
    if(!Array.isArray(lastWeekArray)){
        return res.status(400).json({error:"Invalid lastWeekArray"})
    }

    const validatedArray:Date[] = lastWeekArray.filter((date)=>!DateTime.fromISO(date).isValid);

    if(validatedArray.length > 0){
        return res.status(400).json({error:"lastWeekArray contains invalid dates"})
    }
    next();
}