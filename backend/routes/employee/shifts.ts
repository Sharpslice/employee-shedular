import express from 'express';
import prisma from '../../db/db'
import {io} from '../../src/app'
import { DateTime } from 'luxon';
import { copyOverLastWeek, deleteShift, moveShift } from '../../controllers/shiftsController';
const shifts = express.Router();

shifts.post('/copyOverLastWeek',copyOverLastWeek)
shifts.post('/:id',async(req,res)=>{
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

        io.emit("shiftAdded",{shift:row})
        
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
shifts.delete('/:id',deleteShift)

shifts.patch('/:id',moveShift)



export default shifts