import express from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {getDaysInMonth,format, startOfMonth, getDay} from 'date-fns';
const calendarApi = express.Router();


calendarApi.get('/currentMonth',(req,res)=>{
    const today = new Date();
    const totalDays = getDaysInMonth(today);

    const dayIndex = getDay(startOfMonth(today));

    

    const daysInAMonth: (number | null)[] = Array.from({length:42},()=>{
        return null
    })
    for(let day = dayIndex,i=1; i<=totalDays;day++,i++){
        daysInAMonth[day] = i;
    }

    
    res.json({daysInAMonth})
})

export default calendarApi