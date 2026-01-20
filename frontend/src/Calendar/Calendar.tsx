

import { Box, Flex } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import DateCell from './DateCell';
import { useOutletContext } from 'react-router-dom';
import type { Shift } from '../Dashboard/Interfaces/Shift';
import { DateTime } from 'luxon';
import type { Employee } from '../Dashboard/Interfaces/Employee';



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

    const {shifts,employeeList} = useOutletContext<{shifts: Map<number,Shift>,employeeList:Map<number,Employee>}>();
    
    const shiftsByDateAndEmployee = useMemo(()=>{
        const map = new Map<string,Map<number,Shift[]>>();

        for(const shift of shifts.values()){
            const date = DateTime.fromISO(shift.date,{zone:'utc'}).toISODate()!
            
            if(!map.has(date)){
                map.set(date,new Map<number,Shift[]>())
            }

            const employeeWShift = map.get(date)

            if(employeeWShift?.has(shift.employee_id)){
                employeeWShift.get(shift.employee_id)?.push(shift)
            }
            else{
                employeeWShift?.set(shift.employee_id,[shift])
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
                <Flex key={days} flex={1} justify={'center'} align={'center'} bd={'1px solid grey'}>
                    {days}
                </Flex>
            ))}

            {daysInAMonth.length > 0 && 
            
                daysInAMonth.map((dayObj: MonthElement) => {
                    const date = DateTime.fromISO(dayObj.date,{zone:'utc'}).toISODate()
                    const dailyEmployeeShift = shiftsByDateAndEmployee.get(date!)
                    return <DateCell 
                        day={dayObj} 
                        shiftsByEmployee={dailyEmployeeShift ?? new Map() } 
                        employeeList={employeeList} 
                        />
                })}


        </Box>
    
    </>
    )
}

export default Calendar