

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DateCell from './DateCell';


type MonthElement = {
    week:number,
    date: Date,
    days_of_week:number,
    day_of_month:number
    month: number
}

type CalendarResponse ={
    month: MonthElement[]
    currentMonth: number
    
}
function getMonthName(monthNumber:number){
        const month = new Date(2000,monthNumber-1,1);
        return month.toLocaleString('default',{month:'long'})
    }

function Calendar(){
    const [daysInAMonth,setDayInAMonth] = useState<MonthElement[]>([])
    const [currentMonth,setCurrentMonth] = useState<string>('')
    useEffect(()=>{
        const fetchCalendarData =async()=>{
            try{
                const response = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/currentMonth`,{withCredentials:true});
                setDayInAMonth(response.data.month)
                setCurrentMonth(getMonthName(response.data.currentMonth))
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
                {currentMonth}
            </Box>
            {daysOfTheWeek.map(days =>(
                <Box key={days} sx={{display:'flex',justifyContent:'center',alignItems:'center',border:'1px solid grey',height:'50px'}}>
                    {days}
                </Box>

            ))}
            
            {daysInAMonth.length>0 && daysInAMonth.map((dayObj:MonthElement,index) =>(
                <DateCell key={`${index}`} day={dayObj} ></DateCell>
            ))}

        </Box>




    
    </>
    )
}

export default Calendar