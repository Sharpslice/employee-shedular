import {  em, Flex,Text } from '@mantine/core';
import {  type PropsWithChildren } from "react";
import type { Shift } from '../Dashboard/Interfaces/Shift';
import { useOutletContext } from 'react-router-dom';
import type { Employee } from '../Dashboard/Interfaces/Employee';
import { DateTime } from 'luxon';



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
}
function getMonthName(monthNumber:number){
        const month = new Date(2000,monthNumber-1,1);
        return month.toLocaleString('default',{month:'short'})
    }

    const convertTo12hr = (time:string | null)=>{
        if(!time) return ""
        const dt = DateTime.fromFormat(time,'HH:mm:ss');
        return dt.toFormat('hh:mm a')
    }

function DateCell({day,shiftsByEmployee,employeeList}: PropsWithChildren<Props>){
   
    
    
    return (<>
        <Flex 
            direction={'column'}
            style={{
                backgroundColor: day.month != 8?'rgba(0,0,0,0.1)': "transparent",
                width:'100%', height:'100%',border:'1px solid grey',borderRadius:'0',
            }}>



            <Flex  justify={'center'} bd={'1px solid black'}>
                {day.month==8?day.day_of_month: `${getMonthName(day.month)} ${day.day_of_month}`}
            </Flex>


            <Flex direction={'column'} >
                {
                    [...employeeList.values()].map((employee)=>{

                        return(
                            shiftsByEmployee.has(employee.id)
                            ?   <Flex mih={30} h={20}  p={'4px'}  >
                                    {
                                        shiftsByEmployee.get(employee.id)?.map((shift)=>{
                                            return(
                                                <Text >
                                                    {`
                                                        ${employee.name} - 
                                                        ${convertTo12hr(shift.start_time)} - ${convertTo12hr(shift.end_time)}
                                                        
                                                        
                                                    `}
                                                </Text>
                                            )
                                        })
                                    }
                                </Flex>

                            :

                                <Flex   mih={30} h={20}  p={'4px'}  style={{}} >
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