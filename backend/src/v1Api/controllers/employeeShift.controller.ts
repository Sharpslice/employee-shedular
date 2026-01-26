import {Request,Response} from 'express';
import prisma from '../../../db/db';
import { DateTime } from 'luxon';
import { io } from '../../app';
import { createShiftService, updateShiftTimeservice } from '../services/employeeShift.services';



export async function createShift(req:Request,res:Response){
    const employee_id = Number(req.params.employee_id)
    const date = new Date(req.body.date);


    try{
        const shift = await createShiftService(employee_id,date)

        io.emit("shiftAdded",{shift})
        
     
        return res.status(200).json({success:true,shift})
    }
    catch(error:unknown){
         if(error instanceof Error){
            console.error('Error',error.message)
            return res.status(500).json({success:false,error:error.message})
        }
      

    }
}

export async function updateShiftTimes(req:Request,res:Response){
    const employee_id = Number(req.params.employee_id);
    const shift_id = Number(req.params.shift_id)

    const {start_time,end_time} = req.body;

    
    try{
        const shift =  await updateShiftTimeservice(shift_id,start_time,end_time)

        io.emit('shiftUpdated',{shift})
        return res.status(200).json({success:true,shift})
    }
    catch(error:unknown){
        if(error instanceof Error){
            console.error('Error',error.message)
            return res.status(500).json({success:false,error:error.message})
        }
      

    }   
}