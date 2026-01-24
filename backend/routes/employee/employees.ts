import express from 'express';
import prisma from '../../db/db'
import { DateTime } from 'luxon';

import {io} from '../../src/app'
import { schedule } from '../../controllers/employeeControllers';
const employees = express.Router();


employees.get('/schedule-overview/:view/:date',schedule)


employees.post('/:employee_id/shifts',async(req,res)=>{
    const employee_id = req.params.employee_id;
    const {date,start_time,end_time} = req.body;
    console.log(req.user);
    try{
       const row =  await prisma.employee_Shifts.upsert({
            where:{
                employee_id_date:{ 
                    employee_id: parseInt(employee_id),
                    date: date
                }
            },
            update:
            start_time ?
                {
                    start_time:start_time
                }
            :
                {
                    end_time:end_time
                },
            create:{
                employee_id: parseInt(employee_id),
                date: date,
                start_time: start_time || null,
                end_time: end_time || null,
                
            }
        })
        io.emit('shiftUpdated',{shift:row})
        res.json({success:true,row})
    }
    catch(error:unknown){
        if(error instanceof Error){
            console.error('Error',error.message)
            return res.status(500).json({success:false,error:error.message})
        }
      

    }   
    


    
})



export default employees;

