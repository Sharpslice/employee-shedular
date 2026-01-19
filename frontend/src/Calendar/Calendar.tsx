

import { Box, Flex } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import DateCell from './DateCell';
import { useOutletContext } from 'react-router-dom';
import type { Shift } from '../Dashboard/Interfaces/Shift';
import { DateTime } from 'luxon';



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
    const [daysInAMonth,setDayInAMonth] = useState<MonthElement[]>([])
    // const [currentMonth,setCurrentMonth] = useState<string>('')

    const {shifts} = useOutletContext<{shifts: Map<number,Shift>}>();
    
    const shiftsByDate = useMemo(()=>{
        const map = new Map<string,Shift[]>();

        for(const shift of shifts.values()){
            const date = DateTime.fromISO(shift.date,{zone:'utc'}).toISODate()
            
            if(map.has(date!)){
                console.log(`date: ${date} and shift_date: ${shift.date}`)
                map.get(date!)?.push(shift)
            }
            else{
                map.set(date!,[shift])
            }

            
        }
        console.log(map)
        return map

    },[shifts])
     
    useEffect(()=>{
        const fetchCalendarData =async()=>{
            try{
                const response = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/currentMonth`,{withCredentials:true});
                setDayInAMonth(response.data.month)
                //setCurrentMonth(getMonthName(response.data.currentMonth))
                

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

        <Box style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: '50px repeat(6, 1fr)', width: '100vw', height: '100vh',}}>

            {/* <Box style={{gridColumn: 'span 7',display: 'flex',justifyContent: 'center',alignItems: 'center',border: '1px solid black',fontSize: '24px',}}>
                {currentMonth}
            </Box> */}

            {daysOfTheWeek.map((days) => (
                <Flex key={days} h={'50px'} justify={'center'} align={'center'} bd={'1px solid grey'}>
                    {days}
                </Flex>
            ))}

            {daysInAMonth.length > 0 && 
            
                daysInAMonth.map((dayObj: MonthElement) => {
                    const date = DateTime.fromISO(dayObj.date,{zone:'utc'}).toISODate()
                    const dayShifts = shiftsByDate.get(date!)
                    return <DateCell day={dayObj} shifts={dayShifts ?? []}/>
                })}


        </Box>
    
    </>
    )
}

export default Calendar