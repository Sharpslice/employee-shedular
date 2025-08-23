import express from 'express'
import prisma from '../../db/db';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import {DateTime} from 'luxon'




const calendarApi = express.Router();

calendarApi.get('/date', async(req,res)=>{
    const {date,view} = req.query
    const selectedDate = DateTime.fromISO(date as string)
    let beginDate = selectedDate
    let endDate = selectedDate
    
    switch(view){

        case 'week':
            beginDate = selectedDate.startOf('week',{useLocaleWeeks:true})
            endDate = selectedDate.endOf('week',{useLocaleWeeks:true}).startOf('day')
            break;
        case 'bi-week':
            console.log('bi-week')
            beginDate = selectedDate.startOf('week',{useLocaleWeeks:true})
            console.log(beginDate)
            endDate = selectedDate.plus({weeks:1}).endOf('week',{useLocaleWeeks:true}).startOf('day')
            console.log(endDate)
            break;
        case 'month':
            beginDate = selectedDate.startOf('month').startOf('week',{useLocaleWeeks:true})
            endDate = selectedDate.endOf('month').endOf('week',{useLocaleWeeks:true}).startOf('day')
            break;
        default:
    }
    
    const dateArray = await prisma.calendar.findMany({
        select:{
            week:true,
            date:true,
            day_of_month:true,
            days_of_week:true,
            month:true,
        },
        where:{
            date:{
                gte: beginDate.toJSDate(),
                lte: endDate.toJSDate()
            }
        }
    });
    
    res.json({dateArray})

})


calendarApi.get('/currentMonth',async (req,res)=>{
    const today = DateTime.now()
    const currentMonth = today.month

    const firstDay = today.startOf('month').minus({day:(today.weekday%7)}).toJSDate()

    const endOfMonth = today.endOf('month') 

    const lastDay = endOfMonth.plus({day:6 - (endOfMonth.weekday %7)}).startOf('day').toJSDate()
    console.log(firstDay)
    console.log(lastDay)
    const month = await prisma.calendar.findMany({
        select:{
            week:true,
            date:true,
            day_of_month:true,
            days_of_week:true,
            month:true,
            
        },
        where:{
            date:{
                gte: firstDay,
                lte: lastDay 
            }
        }
    })
    //console.log(month)
    
    res.json({month,currentMonth})
    



    

})

export default calendarApi


