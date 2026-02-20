import {Request,Response} from 'express';
import { createAvailabilityOverrideService } from '../services/override.services';



export async function createAvailabilityOverride(req:Request,res:Response)
{
    const employee_id = req.body.employee_id;
    const date = req.body.date;
    const isAvailable = req.body.isAvailable;
    const note = req.body.note ?? ''

    const start_time = req.body.time.start_time
    const end_time = req.body.time.end_time



    try{
        await createAvailabilityOverrideService(employee_id,date,isAvailable,start_time,end_time)
        return res.status(200).json({success:true})
    }   

    catch(error:any)
    {
        console.error("time override failed:", error);
        return res.status(500).json({success:false})
    }
}

