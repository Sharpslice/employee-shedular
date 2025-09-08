import { Box, Flex } from "@mantine/core";
import { useOutletContext} from "react-router-dom";
import Cell from "../Cell/Cell";
import type { Employee } from "../Interfaces/Employee";
import type { Day } from "../Interfaces/Day";
import type { Shift } from "../Interfaces/Shift";




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
    const { dateRange,shifts,employeeList } = useOutletContext<{ dateRange: Day[],shifts:Map<number,Shift[]>,employeeList:Employee[] }>();

   
    return (<>
        <Flex w={'100%'} direction={"column"}>

            <Flex w={'100%'}>
                {dateRange.map((day)=>{
                    return (
                        <Box key={day.date} flex={1} style={{border:'1px solid black', textAlign:"center"}}>
                            {`${weekDayFromIndex(day.days_of_week)} ${day.day_of_month}`}
                        </Box>
                    )
                })}
            </Flex>

            <Box display={"grid"} style={{gridTemplateColumns:'repeat(7,1fr)'}}>
                {employeeList.map((employee)=>{
                    return(
                        dateRange.map((date)=>{
                        
                            const shift = shifts.get(employee.id)?.find((schedule)=>schedule.date === date.date)
                           
                            return(
                               
                                <Cell key={employee.id+date.date} date={date.date} employee={employee} shift={shift}></Cell>
                                
                            )
                        })

                    )
                })}
            </Box>
                
            
        </Flex>
      
    </>)
}
export default Week;