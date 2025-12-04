import express from 'express';
import prisma from '../../db/db'
import {io} from '../../src/app'
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

export default shift