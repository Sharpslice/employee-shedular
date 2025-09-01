import express from 'express';
import prisma from '../../db/db'
import { DateTime } from 'luxon';

const employee = express.Router();


employee.get('/all',async(req,res)=>{
    const employeeList = await prisma.employee.findMany({
        select:{
            id:true,
            name:true
        }


    })
    console.log(employeeList)
    res.json({employeeList})

})

employee.get('/schedule/:view/:date',async(req,res)=>{
  
    const view = req.params.view;
    const date = req.params.date
    console.log(view)
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

        console.log(beginDate.toJSDate());
        console.log(endDate.toJSDate())
    

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
    console.log(scheduleArray)
    res.json({scheduleArray})


})

export default employee;

