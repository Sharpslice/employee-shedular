import express from 'express'
import prisma from '../../db/db';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {getDaysInMonth,format, startOfMonth, getDay, endOfMonth, startOfDay} from 'date-fns';

const calendarApi = express.Router();


calendarApi.get('/currentMonth',async (req,res)=>{
    const calendarMap: {} = {};

    
   
    const firstDay = startOfMonth( new Date());
    const lastDay = endOfMonth(new Date());
    const month = await prisma.calendar.findMany({
        select:{
            date:true,
            days_of_week:true,
            week:true
        },
        where:{
            date:{
                gte: firstDay,
                lte: lastDay
            }
        }



    })
    console.log(month)

    



    

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