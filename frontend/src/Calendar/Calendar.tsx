

import { Box, Flex } from '@mantine/core';

import axios from 'axios';
import DateCell from './DateCell';

import { useQuery } from '@tanstack/react-query';




type MonthElement = {
    week:number,
    date: string,
    days_of_week:number,
    day_of_month:number
    month: number
}

type CalendarResponse ={
    month: MonthElement[]
    currentMonth: number
    
}
// function getMonthName(monthNumber:number){
//         const month = new Date(2000,monthNumber-1,1);
//         return month.toLocaleString('default',{month:'long'})
//     }

function Calendar(){

        const fetchCalendarData =async()=>{
            try{
                const response = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/currentMonth`,{withCredentials:true});
                return response.data.month
              

            }catch(error){
                if(error instanceof Error)
                {
                    console.log(error.message)
                }
                
            }
        }
    const {data:daysInAMonth } = useQuery({queryKey: ['schedule',2026,4],queryFn:fetchCalendarData, staleTime: 0});
    console.log('month: ',daysInAMonth)

    const daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    if(!daysInAMonth) return null


    
    return (
    <>

        <Box style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: '50px repeat(6, 1fr)', width: '100vw', height: '100vh',}}>

            {/* <Box style={{gridColumn: 'span 7',display: 'flex',justifyContent: 'center',alignItems: 'center',border: '1px solid black',fontSize: '24px',}}>
                {currentMonth}
            </Box> */}

            {daysOfTheWeek.map((days) => (
                <Flex key={days} flex={1} justify={'center'} align={'center'} bd={'1px solid grey'}>
                    {days}
                </Flex>
            ))}

            {daysInAMonth.length > 0 && 
            
                daysInAMonth.map((dayObj: MonthElement) => {
                    
                    //const date = DateTime.fromISO(dayObj.date).toISODate()!
                   
                    return (
                    <>
                        <DateCell day={dayObj}></DateCell>
                    
                    
                    </>)
                })}


        </Box>
    
    </>
    )
}

export default Calendar