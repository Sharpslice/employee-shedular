import { Box, Text,Flex } from "@mantine/core";
import { useOutletContext} from "react-router-dom";
import Cell from "../Cell/Cell";
import type { Employee } from "../Interfaces/Employee";
import type { Day } from "../Interfaces/Day";
import type { Shift } from "../Interfaces/Shift";
import EmployeeRow from "../EmployeeRow";
import {DateTime} from 'luxon'
import ViewHeader from "./View-header";



function weekDayFromIndex(num:number){
    switch(num){
        case 0:
            return "Sun"
        case 1:
            return "Mon"
        case 2:
            return "Tue"
        case 3:
            return "Wed"
        case 4:
            return "Thu"
        case 5:
            return "Fri"
        case 6:
            return "Sat"
                 
    }
}

function Week(){
    const { dateRange,employeeList } = useOutletContext<{ dateRange: Day[],shifts:Map<number,Shift[]>,employeeList:Employee[] }>();

    const today = DateTime.now().startOf('day').toISODate()
   
    return (<>
        <Flex w={'100%'} gap={5} direction={"column"}>
            
            <ViewHeader colGap={5}>
                {dateRange.map((day)=>{

                    const isToday = today === DateTime.fromISO(day.date).toUTC().toISODate()
                   
                    return (
                        <Box bg={isToday ? 'blue': undefined}  
                            key={day.date} flex={1} style={{border:'1px solid black', textAlign:"center"}}>
                                <Text c={isToday? 'white': undefined} fw={isToday? 'bold': undefined}>
                                    {`${weekDayFromIndex(day.days_of_week)} ${day.day_of_month}`}
                                </Text>
                            
                        </Box>
                    )
                    })}
            </ViewHeader>


            <Flex gap={10} direction={'column'}>
                    {employeeList.map((employee)=>{
                    return (
                        <EmployeeRow  employee={employee} >
                            {dateRange.map((date)=>{

                                const shift = employee.shifts?.find((schedule)=>schedule.date === (date.date))
                                return(
                                    <Flex bd={'1px solid black'} flex={1} style={{padding:7}}>
                                        <Cell date={date.date} employee={employee} shift={shift}/>
                                    </Flex>
                                    
                                )

                            })}
                        </EmployeeRow>



                    )
                })}
            </Flex>
            
            
                
            
        </Flex>
      
    </>)
}
export default Week;