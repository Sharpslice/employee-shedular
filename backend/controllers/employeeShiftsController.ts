import {Request,Response} from 'express';
import prisma from '../db/db';
import { DateTime } from 'luxon';
import { io } from '../src/app';



export async function createShift(req:Request,res:Response){
    const employee_id = Number(req.params.id)
    const date = new Date(req.body.date);

    if(!(date instanceof Date) || isNaN(date.getTime())){
        return res.status(400).json({error:"Invalid date id"})
    }

    if(Number.isNaN(employee_id)){
        return res.status(400).json({error: "Invalid employee id"})
    }
  

    try{
        const shift = await prisma.employee_Shifts.create({
           data:{
                employee_id:employee_id,
                date: date,
                start_time:null,
                end_time:null
           }
        })

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

    if(Number.isNaN(employee_id)){
        return res.status(400).json({error: "Invalid employee id"})
    }
    if(Number.isNaN(shift_id)){
        return res.status(400).json({error:"Invalid shift id"})
    }


    
    try{
       const shift =  await prisma.employee_Shifts.update({
            where:{
                id:shift_id
            },
            data:
                start_time 
                ? {start_time}
                : {end_time} 
        })

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