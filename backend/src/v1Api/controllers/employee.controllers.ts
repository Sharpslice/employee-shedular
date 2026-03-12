import {Request,Response} from 'express';
import prisma from '../../../db/db';
import { DateTime } from 'luxon';
import { scheduleService } from '../services/employee.services';
import { availabilities } from './availability.controller';


export async function schedule(req:Request,res:Response){
    const view = req.params.view;
    const date = req.params.date;
    
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
            return res.status(400).json({error: `Please enter "day", "week", or "month"`})
    }

    try{
        const response = await scheduleService(beginDate,endDate)
     
        return res.json({
            employeeList:response.employeeList,
            shifts:response.shifts,
            availabilities:response.availabilities,
            av_time_blocks:response.av_time_blocks,
            overrides:response.overrides,
            ov_time_blocks:response.ov_time_blocks
           
        })

    }catch(error){
        return res.status(500).json({error: "error fetching employees and shifts"})
    }
    
}