

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';



type CalendarResponse ={
    daysInAMonth: (number | null)[];
}

function Calendar(){
    const [daysInAMonth, setDaysInAMonth] = useState<(number|null)[]>([]);
   
    useEffect(()=>{
        const fetchCalendarData =async()=>{
            try{
                const response = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/currentMonth`,{withCredentials:true});
                
                setDaysInAMonth(response.data.daysInAMonth);

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
    <Box sx={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gridTemplateRows:'50px repeat(6,1fr)',width:'65vw',height:'100vh'}}>

        {daysOfTheWeek.map(days =>(
            <Box key={days} sx={{display:'flex',justifyContent:'center',alignItems:'center',border:'1px solid grey',height:'50px'}}>
                {days}

            </Box>

        ))}

        {daysInAMonth.map((day,index) =>(
            
            <Box key={index} sx={{width:'100%', height:'100%',border:'1px solid grey',borderRadius:'0'}}>
                {day}
            </Box>
        ))}
        
    </Box>
        
    </>
    )
}

export default Calendar