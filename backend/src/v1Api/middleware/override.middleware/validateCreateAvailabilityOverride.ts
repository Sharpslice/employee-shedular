import { error } from "console";
import { Request,Response,NextFunction } from "express"
import { DateTime } from "luxon";


export function validateAvailabilityOverride(req:Request,res:Response,next:NextFunction){
    const employee_id = Number(req.body.employee_id);
    const date = DateTime.fromISO(req.body.date);
    const isAvailable = req.body.isAvailable;
    const note = req.body.note ?? ''
    const start_time = DateTime.fromISO(req.body.time.start_time);
    const end_time = DateTime.fromISO( req.body.time.end_time);

    if (Number.isNaN(employee_id)){
        return res.status(400).json({error: 'employee_id is not an integer'})
    }
    if(!date.isValid){
        return res.status(400).json({error: 'date is not an iso date'})
    }
    if(typeof isAvailable !== 'boolean'){
        return res.status(400).json({error: 'isAvailable is not a boolean'})
    }
    if (!start_time.isValid){
        return res.status(400).json({error:'start time is not an iso value'})
    }
    if(!end_time.isValid){
        return res.status(400).json({error:'end_time is not an iso value'})
    }

    req.body.time.start_time = DateTime.fromISO(req.body.time.start_time).set({year:1970,month:1,day:1}).toUTC()
    req.body.time.end_time = DateTime.fromISO(req.body.time.end_time).set({year:1970,month:1,day:1}).toUTC()

    next()


}