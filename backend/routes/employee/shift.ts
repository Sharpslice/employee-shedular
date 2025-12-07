import express from 'express';
import prisma from '../../db/db'
import {io} from '../../src/app'
import { DateTime } from 'luxon';
const shift = express.Router();


shift.post('/:id/shift',async(req,res)=>{
    const employee_id = parseInt(req.params.id)
    const {date} = req.body;
    try{
        const row = await prisma.employee_Shifts.create({
           data:{
                employee_id:employee_id,
                date: new Date(date),
                start_time:null,
                end_time:null
           }
        })

        io.emit("shiftAdded",row)
        
        console.log('backend socket emit')
        res.json({success:true,row})
    }
    catch(error:unknown){
         if(error instanceof Error){
            console.error('Error',error.message)
            return res.status(500).json({success:false,error:error.message})
        }
      

    }
})

shift.delete('/:id/delete',async(req,res)=>{
    const shift_id = parseInt(req.params.id);
   
    try{
        const deletedShift = await prisma.employee_Shifts.delete({
            where:{id:shift_id},
            select:{id:true,employee_id:true}
        })
        
        io.emit("shiftDeleted",{employee_id:deletedShift.employee_id, shift_id:deletedShift.id})

    }catch(error:unknown){
        if(error instanceof Error){
            console.error('Error',error.message)
            return res.status(500).json({success:false,error:error.message})
        }
    }
})

shift.post('/copyOverLastWeek',async(req,res)=>{
    //const startOfWeekDate = req.params.startOfWeek;
    //console.log('body:', req.body)
    const {lastWeekArray} = req.body
    //console.log(lastWeekArray)
    const shifts = await prisma.employee_Shifts.findMany({
        select:{
            employee_id:true,
            date:true,
            start_time:true,
            end_time:true,
        },
        where:{
            date:{
                in:lastWeekArray.map((date:string)=> new Date(date))
            }
            }
    });

    const newShifts = shifts.map((shift)=>{
        return(
            {
                employee_id:shift.employee_id,
                date: DateTime.fromJSDate(shift.date).plus({week:1}).toJSDate() ,
                start_time:shift.start_time,
                end_time:shift.start_time,

            }
        )
        
    })

    //console.log(newShifts)
    

     await prisma.employee_Shifts.createMany({

        data:newShifts


    })
    
    const data = await prisma.employee_Shifts.findMany({
        where:{
            date:{
                in: newShifts.map((shift)=>shift.date)
            }
        }
    })
    console.log(data)
    io.emit('copyOverLastWeekshift',data)
    res.json({success:true,shifts:shifts})
    
})

export default shift