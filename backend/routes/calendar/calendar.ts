import express from 'express'
import prisma from '../../db/db';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {getDaysInMonth,format, startOfMonth, getDay, endOfMonth, startOfDay,startOfWeek,endOfWeek,addMonths} from 'date-fns';
import {DateTime} from 'luxon'




const calendarApi = express.Router();

calendarApi.get('/date', async(req,res)=>{
    const {date} = req.query
    
    const newDate = (DateTime.fromISO(date as string));

    const startOfWeek = (newDate.minus({day: (newDate.weekday % 7)}))
    const endOfWeek = startOfWeek.plus({day:6})
    
    const dateArray = await prisma.calendar.findMany({
        select:{
            date:true,
        },
        where:{
            date:{
                gte: startOfWeek.toJSDate(),
                lte: endOfWeek.toJSDate()
            }
        }
    });
    console.log(dateArray)
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


