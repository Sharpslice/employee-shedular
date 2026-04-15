import { Request,Response } from "express";
import { createAvailabilityService, createLeaveService } from "../services/employeeOverride.services";
import { createTimeOverrideService } from "../services/override.services";
import { io } from "../../app";
import { DateTime } from "luxon";


export async function createTimeOverride(req:Request,res:Response)
{
    const employee_id = req.body.employee_id;
    const date = req.body.date;
    const type = req.body.type;
    const note = req.body.note ?? ''
    const shift_id = Number(req.body.shift_id) ?? null
    const start_time = req.body.time.start_time
    const end_time = req.body.time.end_time



    try{
        const response = await createTimeOverrideService(employee_id,date,type,start_time,end_time,shift_id)

        io.emit('manualTimeOverride',{override: response.override,time_block: response.time_block})
        return res.status(200).json({success:true})
    }   

    catch(error:any)
    {
        console.error("time override failed:", error);
        return res.status(500).json({success:false})
    }
}


export async function createLeave(req:Request,res:Response){
    const note = req.body.note;
    const date = req.body.date;
    const employee_id = Number(req.params.employee_id);

    try{
        const override = await createLeaveService(employee_id,date)
        console.log('hey')
        io.emit('addOverride',override)
        res.status(200).json({success:true,override })



    }
    catch(error:unknown){
         if(error instanceof Error){
            console.error('Error',error.message)
            return res.status(500).json({success:false,error:error.message})
        }
    
    }

}

export async function createAvailability(req:Request,res:Response){
    const employee_id = Number(req.params.employee_id)
    const date = req.body.date

    const startDt = req.body.start_time 
        ? DateTime.fromISO(req.body.start_time).set({ year: 1970, month: 1, day: 1 }).toUTC().toISO()!
        : undefined

    const endDt = req.body.end_time
        ? DateTime.fromISO(req.body.end_time).set({ year: 1970, month: 1, day: 1 }).toUTC().toISO()!
        : undefined

    const time_block = req.body.time_block ?? undefined
    
    try{
        const exception = await createAvailabilityService(employee_id,date,time_block,startDt,endDt)
        io.emit('availability:update',{
            exception
        })
       
        console.log('exc',exception)
        res.status(200).json({success:true})
    }
    catch(error:unknown){
        console.error('createAvailability error:', error)
    return res.status(500).json({ success: false, error: 'Failed to create availability' })
    }
}


