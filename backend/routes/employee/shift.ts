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

shift.patch('/moveShift/:id',async(req,res)=>{
    const shift_id = parseInt(req.params.id);
    const {employee_id,date,socketId} = req.body


    try{
        const originalShift = await prisma.employee_Shifts.findUnique({
            where:{id:shift_id}
        })

        if (!originalShift) return res.status(404).json({ error: "Shift not found" });


        const updatedShift = await prisma.employee_Shifts.update({
            where:{
                id:shift_id
            },
            data:{
                employee_id:employee_id,
                date: new Date(date)
            }
        })
        console.log(`${originalShift.employee_id} -> ${updatedShift.employee_id}`)

        io.emit('shiftMoved',{ oldShift: originalShift, updatedShift })
        res.status(200).json({ oldShift: originalShift, updatedShift });

    }catch(error){
        console.error("Error updating shift:", error);
        res.status(500).json({ error: "Failed to update shift" });
    }

})

shift.post('/copyOverLastWeek',async(req,res)=>{
  
    const {lastWeekArray} = req.body
    const thisWeekArray= lastWeekArray.map((date:string)=>{
        return(
            DateTime.fromISO(date).plus({week:1}).toJSDate()
        )
    })

    await prisma.$transaction(async(tx)=>{

        // grabs all shifts from last week using last weeks dates sun-sat
        const prevShifts = await tx.employee_Shifts.findMany({
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
    
        //takes all the shifts found last week and updates their dates to match current week
        const newShifts = prevShifts.map((shift)=>{
           
            return(
                {
                    employee_id:shift.employee_id,
                    date: DateTime.fromJSDate(shift.date).plus({week:1}).toJSDate() ,
                    start_time:shift.start_time,
                    end_time:shift.end_time,

                }
            )
            
        })

        await tx.employee_Shifts.deleteMany({
            where:{
                date: {
                    in: thisWeekArray
                }
            }
        })
        await tx.employee_Shifts.createMany({

            data:newShifts,
       


        })
    
        const data = await tx.employee_Shifts.findMany({
            where:{
                date:{
                    in: thisWeekArray
                }
            }
        })

        io.emit('copyOverLastWeekshift',data)
        res.json({success:true,shifts:prevShifts})
    })
    

    
   
    

    
    
    
    
})

export default shift