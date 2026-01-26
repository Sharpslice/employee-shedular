import {Request,Response} from 'express';
import prisma from '../../../db/db';
import { DateTime } from 'luxon';


export async function schedule(req:Request,res:Response){
    const view = req.params.view;
    const date = req.params.date;

    if(!view){
        return res.status(400).json({error: "please input a view "})
    }

    if(!date ){
        return res.status(400).json({error: "please input a date "})
    }


    const selectedDate = DateTime.fromISO(date as string)

    if(!selectedDate.isValid){
        return res.status(400).json({error: "invalid date. must be year-month-day"})
    }




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
            return res.status(400).json({error: `Please enter "day", "week", or "month"`})
    }

    try{
        const employeeList = await prisma.employee.findMany({
        select:{
            id:true,
            name:true,
            isWorking:true,
            position:true,
            },
        })


        const shifts = await prisma.employee_Shifts.findMany({
            where:{
                date:{
                    gte: beginDate.toJSDate(),
                    lte: endDate.toJSDate()
                }
                
            }
        })
   
        return res.json({employeeList,shifts})

    }catch(error){
        return res.status(500).json({error: "error fetching employees and shifts"})
    }
    
}