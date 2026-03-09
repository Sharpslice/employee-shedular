import { Request,Response } from "express";
import { createLeaveService } from "../services/employeeOverride.services";
import { createAvailabilityOverrideService } from "../services/override.services";
import { io } from "../../app";


export async function createAvailabilityOverride(req:Request,res:Response)
{
    const employee_id = req.body.employee_id;
    const date = req.body.date;
    const type = req.body.type;
    const note = req.body.note ?? ''
    const shift_id = Number(req.body.shift_id) ?? null
    const start_time = req.body.time.start_time
    const end_time = req.body.time.end_time



    try{
        const response = await createAvailabilityOverrideService(employee_id,date,type,start_time,end_time,shift_id)

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

