
import { useEffect } from "react"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {getDaysInMonth} from 'date-fns';
import { Box } from '@mui/material';

function Calendar(){


    //const today = new Date();
    //const totalDays = getDaysInMonth(today);

    useEffect(()=>{
        
    })

    const daysInAMonth = Array.from({length: 35},()=>{
        return {test:1}
    })

    const daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    return (
    <>
    <Box sx={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gridTemplateRows:'50px repeat(5,1fr)',width:'65vw',height:'100vh'}}>

        {daysOfTheWeek.map(days =>(
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',border:'1px solid grey',height:'50px'}}>
                {days}

            </Box>

        ))}

            {daysInAMonth.map((day) =>(
                
                <Box sx={{width:'100%', height:'100%',border:'1px solid grey',borderRadius:'0'}}>
                    {day.test}
                </Box>
            ))}
        
    </Box>
        
    </>
    )
}

export default Calendar