import { NextFunction } from "express";
import { Request,Response } from "express";
import { DateTime } from "luxon";


export function normalizeTime(req:Request, res:Response,next: NextFunction){
    req.body.start_time = DateTime.fromISO(req.body.start_time).set({year:1970,month:1,day:1}).toISO();
    req.body.end_time = DateTime.fromISO(req.body.end_time).set({year:1970,month:1,day:1}).toISO();

    
    next();
}