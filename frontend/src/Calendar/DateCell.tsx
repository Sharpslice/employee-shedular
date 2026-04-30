import { Flex,Text } from '@mantine/core';
import {  type PropsWithChildren } from "react";
import type { Shift } from '../Dashboard/Interfaces/Shift';

import type { Employee } from '../Dashboard/Interfaces/Employee';
import { DateTime } from 'luxon';
import {  useNavigate } from 'react-router-dom';
import type { Override } from '../Dashboard/Interfaces/Override';
import { useScheduleStore } from '../scheduleStore';
import Row from './row';



type MonthElement = {
    week:number,
    date: string,
    days_of_week:number,
    day_of_month:number
    month: number
}
type Props ={
   
    day: MonthElement
   
}
function getMonthName(monthNumber:number){
        const month = new Date(2000,monthNumber-1,1);
        return month.toLocaleString('default',{month:'short'})
    }







function DateCell({day}: PropsWithChildren<Props>){
   
    const navigate =useNavigate()

    function navigateTo(view:'day' | 'week', date:string){
        
        const formattedDate = DateTime.fromISO(date,{zone:'utc'}).toISODate() //2026-01-24
        console.log(formattedDate)
        navigate(`/schedule/${view}/${formattedDate}`)
      
        
    }
    const employeeList = useScheduleStore(state=>state.employees)
    
    console.log(day.date)


    const date = DateTime.fromISO(day.date,{zone:'utc'}).toISODate()!
    return (<>
        <Flex 
            direction={'column'}
            style={{
                backgroundColor: day.month != 8?'rgba(0,0,0,0.1)': "transparent",
                width:'100%', height:'100%',border:'1px solid grey',borderRadius:'0', minHeight:'450px'
            }}>



            <Flex onDoubleClick={()=>{navigateTo('day',day.date)}} justify={'center'} bd={'1px solid black'}>
                {day.month==8?day.day_of_month: `${getMonthName(day.month)} ${day.day_of_month}`}
            </Flex>


            <Flex direction={'column'} >
                {
                    employeeList.map((e)=>{

                        
                        return(
                            <>
                                <Flex mih={30}>
                                    <Row employee={e} date={date}></Row>
                                </Flex>
                            </>
                        )
                    })


                   
                
                
                
                
                
                }




            </Flex>
{/* 
/* <Text>{employeeList.get(shift.employee_id)?.name}</Text>
                        <Text >-</Text>
                        <Text >{convertTo12hr( shift.start_time)}</Text>  
                        <Text >-</Text>
                        <Text >{convertTo12hr( shift.end_time)}</Text> */}
            
        </Flex>
    </>)
}

export default DateCell;