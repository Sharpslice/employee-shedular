import { Request,Response,NextFunction } from "express"
import { DateTime } from "luxon";


export function validateSchedule(req:Request,res:Response,next:NextFunction){
    const view = req.params.view;
    const date = req.params.date;

    if(!view){
        return res.status(400).json({error: "please input a view "})
    }

    if(!date ){
        return res.status(400).json({error: "please input a date "})
    }


    const selectedDate = DateTime.fromISO(date as string)

    if(!selectedDate.isValid){
        return res.status(400).json({error: "invalid date. must be year-month-day"})
    }
    next();
}