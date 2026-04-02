import { Flex,Text } from '@mantine/core';
import {  type PropsWithChildren } from "react";
import type { Shift } from '../Dashboard/Interfaces/Shift';

import type { Employee } from '../Dashboard/Interfaces/Employee';
import { DateTime } from 'luxon';
import {  useNavigate } from 'react-router-dom';
import type { Override } from '../Dashboard/Interfaces/Override';



type MonthElement = {
    week:number,
    date: string,
    days_of_week:number,
    day_of_month:number
    month: number
}
type Props ={
   
    day: MonthElement
    employeeList: Map<number,Employee>
    shiftsByEmployee: Map<number,Shift[]>
    overridesByEmployee: Map<number,Override[]>
}
function getMonthName(monthNumber:number){
        const month = new Date(2000,monthNumber-1,1);
        return month.toLocaleString('default',{month:'short'})
    }

    const convertTo12hr = (time:string | null)=>{
        if(!time) return ""
        const dt = DateTime.fromISO(time);
        return dt.toFormat('hh:mm a')
    }





function DateCell({day,shiftsByEmployee,employeeList,overridesByEmployee}: PropsWithChildren<Props>){
   
    const navigate =useNavigate()

    function navigateTo(view:'day' | 'week', date:string){
        
        const formattedDate = DateTime.fromISO(date,{zone:'utc'}).toISODate() //2026-01-24
        console.log(formattedDate)
        navigate(`/schedule/${view}/${formattedDate}`)
      
        
    }
    
    return (<>
        <Flex 
            direction={'column'}
            style={{
                backgroundColor: day.month != 8?'rgba(0,0,0,0.1)': "transparent",
                width:'100%', height:'100%',border:'1px solid grey',borderRadius:'0',
            }}>



            <Flex onDoubleClick={()=>{navigateTo('day',day.date)}} justify={'center'} bd={'1px solid black'}>
                {day.month==8?day.day_of_month: `${getMonthName(day.month)} ${day.day_of_month}`}
            </Flex>


            <Flex direction={'column'} >
                {
                    [...employeeList.values()].map((employee)=>{

                        return(
                            shiftsByEmployee.has(employee.id)
                            ?   <Flex bg={`${employee.color}`} key={employee.id} mih={30} h={20}  p={'4px'} wrap='wrap'  >
                                    {
                                        shiftsByEmployee.get(employee.id)?.map((shift)=>{
                                            return(
                                                <Text key={shift.id} onDoubleClick={()=>{navigateTo('week',shift.date)}}>
                                                    {`
                                                        ${employee.name} - 
                                                        ${convertTo12hr(shift.start_time)} - ${convertTo12hr(shift.end_time)}
                                                        
                                                        
                                                    `}
                                                </Text>
                                            )
                                        })
                                    }
                                </Flex>

                            : overridesByEmployee.has(employee.id) ? 
                                    <Flex bg={`${employee.color}`} key={employee.id} mih={30} h={20}  p={'4px'} wrap='wrap'  >
                                    {
                                        overridesByEmployee.get(employee.id)?.map((override)=>{
                                            return(
                                                <Text>
                                                    {`
                                                        ${employee.name} - 
                                                        ${'unavailable'} 
                                                        
                                                        
                                                    `}
                                                    
                                                </Text>
                                            )
                                        })
                                    }
                                </Flex>
                            
                            
                            
                            :

                                <Flex key={employee.id}  mih={30} h={20}  p={'4px'}  style={{}} >
                                    {''}
                                </Flex>
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