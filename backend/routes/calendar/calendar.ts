import express from 'express'
import prisma from '../../db/db';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {getDaysInMonth,format, startOfMonth, getDay, endOfMonth, startOfDay,startOfWeek,endOfWeek,addMonths} from 'date-fns';
import {DateTime} from 'luxon'
const calendarApi = express.Router();

function resetTimeToMidnight(date:Date){
    const utcStart = new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,0,0,0
    ));

    return utcStart
}
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
    const today = new Date()

    const currentMonth = (today).getMonth() + 1

    const firstDay = startOfWeek( startOfMonth(today)  )
    const lastDay =  startOfDay (endOfWeek( endOfMonth(today))) 
 
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
    console.log(month)
    
    res.json({month,currentMonth})
    



    

})

export default calendarApi


//const today = new Date();
    // const totalDays = getDaysInMonth(today);

    // const dayIndex = getDay(startOfMonth(today));

    // const currentMonthString = format(new Date(),'MMMM');


    // const daysInAMonth: (number | null)[] = Array.from({length:42},()=>{
    //     return null
    // })
    // for(let day = dayIndex,i=1; i<=totalDays;day++,i++){
    //     daysInAMonth[day] = i;
    // }

    
    // res.json({currentMonthString,daysInAMonth})