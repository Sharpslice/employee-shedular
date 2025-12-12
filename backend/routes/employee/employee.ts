import express from 'express';
import prisma from '../../db/db'
import { DateTime } from 'luxon';

import {io} from '../../src/app'
const employee = express.Router();


employee.get('/',async(req,res)=>{

    const employeeList = await prisma.employee.findMany({
        select:{
            id:true,
            name:true,
            isWorking:true,
            position:true,
            shifts:{
               
            },
            availability:{

            },
            override:{

            }
        },
        
        

    })
   
    res.json({employeeList})
})

employee.delete('/shift/:shift_id',async(req,res)=>{
    const shift_id = req.params.shift_id;

    console.log(`delete ${shift_id}`)
    await prisma.employee_Shifts.delete({
        where:{id: parseInt(shift_id)}
    })
    res.json({success:true})
})

employee.post('/:employee_id/shift',async(req,res)=>{
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
        io.emit('shiftUpdated',row)
        res.json({success:true,row})
    }
    catch(error:unknown){
        if(error instanceof Error){
            console.error('Error',error.message)
            return res.status(500).json({success:false,error:error.message})
        }
      

    }   
    


    
})


employee.get('/schedule/:view/:date',async(req,res)=>{
  
    const view = req.params.view;
    const date = req.params.date
    console.log(req.user);
  
    const selectedDate = DateTime.fromISO(date as string)
        let beginDate = selectedDate
        let endDate = selectedDate
        
        switch(view){
            case 'day':
                beginDate = selectedDate.startOf('day');
                endDate = selectedDate.startOf('day');
                break;
            case 'week':
                beginDate = selectedDate.startOf('week',{useLocaleWeeks:true})
                endDate = selectedDate.endOf('week',{useLocaleWeeks:true}).startOf('day')
                break;
            case 'month':
                beginDate = selectedDate.startOf('month').startOf('week',{useLocaleWeeks:true})
                endDate = selectedDate.endOf('month').endOf('week',{useLocaleWeeks:true}).startOf('day')
                break;
            default:
               
        }

      
    
    const scheduleArray = await prisma.employee_Shifts.findMany({
        select:{
            employee_id:true,
            date:true,
            start_time:true,
            end_time:true
        },
        where:{
        date:{
            gte: beginDate.toJSDate(),
            lte: endDate.toJSDate()
        }
    }
    });
    
    const scheduleObject = scheduleArray.reduce<{[key:number]:ScheduleArray[]}>((map,schedule)=>{
        if(! map[schedule.employee_id]){
            map[schedule.employee_id] = []
        }
        
        map[schedule.employee_id]?.push(schedule)
        return map 
    },{})
   



    res.json({scheduleObject})


})
interface ScheduleArray{
    employee_id:number,
    date:Date,
    start_time:string | null,
    end_time:string | null
}
export default employee;

