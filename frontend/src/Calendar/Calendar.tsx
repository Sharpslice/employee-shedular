
import { useEffect } from "react"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {getDaysInMonth,format, startOfMonth, getDay} from 'date-fns';
import { Box } from '@mui/material';

function Calendar(){


    const today = new Date();
    const totalDays = getDaysInMonth(today);

    const dayIndex = getDay(startOfMonth(today));

    useEffect(()=>{
        console.log(totalDays)
    })

    const daysInAMonth: (number | null)[] = Array.from({length:42},()=>{
        return null
    })
    for(let day = dayIndex,i=1; i<=totalDays;day++,i++){
        daysInAMonth[day] = i;
    }


    

    const daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    return (
    <>
    <Box sx={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gridTemplateRows:'50px repeat(6,1fr)',width:'65vw',height:'100vh'}}>

        {daysOfTheWeek.map(days =>(
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',border:'1px solid grey',height:'50px'}}>
                {days}

            </Box>

        ))}

        {daysInAMonth.map((day) =>(
            
            <Box sx={{width:'100%', height:'100%',border:'1px solid grey',borderRadius:'0'}}>
                {day}
            </Box>
        ))}
        
    </Box>
        
    </>
    )
}

export default Calendar