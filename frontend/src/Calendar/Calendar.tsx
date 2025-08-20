

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

type MonthElement = {
    week:number,
    date: Date,
    days_of_week:number,
    day_of_month:number
}

type CalendarResponse ={
    month: MonthElement[]
    currentMonth: string
    
}

function Calendar(){
    const [daysInAMonth,setDayInAMonth] = useState<MonthElement[]>([])
    const [currentMonth,setCurrentMonth] = useState<string>('')
    useEffect(()=>{
        const fetchCalendarData =async()=>{
            try{
                const response = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/currentMonth`,{withCredentials:true});
                setDayInAMonth(response.data.month)
                setCurrentMonth(response.data.currentMonth)
                console.log(response.data.month)

            }catch(error){
                if(error instanceof Error)
                {
                    console.log(error.message)
                }
                
            }
            

        }
        fetchCalendarData();
    },[])


    

    const daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    return (
    <>
    <Box sx={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gridTemplateRows:'50px 50px repeat(6,1fr)',width:'65vw',height:'100vh'}}>

        <Box gridColumn={"span 7"} sx={{display:'flex',justifyContent:'center',alignItems:'center',border:'1px solid black',fontSize:'24px'}}>
            { currentMonth }
        </Box>


        {daysOfTheWeek.map(days =>(
            <Box key={days} sx={{display:'flex',justifyContent:'center',alignItems:'center',border:'1px solid grey',height:'50px'}}>
                {days}

            </Box>

        ))}

        {daysInAMonth.length>0 && daysInAMonth.map((day:MonthElement,index) =>(
            
            <Box key={index} sx={{width:'100%', height:'100%',border:'1px solid grey',borderRadius:'0'}}>
                {day.day_of_month}
            </Box>
        ))}
        
    </Box>
        
    </>
    )
}

export default Calendar