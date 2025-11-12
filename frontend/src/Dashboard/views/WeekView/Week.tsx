import { Flex } from "@mantine/core";
import { useOutletContext} from "react-router-dom";

import type { Employee } from "../../Interfaces/Employee";
import type { Day } from "../../Interfaces/Day";
import EmployeeRow from "../EmployeeRow/EmployeeRow";

import ViewHeader from "./View-header";



import WeekHeaderCell from "./WeekHeaderCell";

import { GridNavigationProvider } from "../GridNavigation/GridNavigationContext";


function Week(){
    const { dateRange,employeeList } = useOutletContext<{ dateRange: Day[],employeeList:Employee[] }>();

  
  
    if (!employeeList.length || !dateRange.length) return null;
    return (
        <Flex w={'100%'} gap={5} direction={"column"}>
            <ViewHeader colGap={5}>
                {dateRange.map((day)=>(
                    <WeekHeaderCell key={day.days_of_week} day={day}/>
                ))}
            </ViewHeader>

            <GridNavigationProvider>
                <Flex gap={10} direction={'column'}>
                
                    {employeeList.map((employee,row)=>{     
                        return(
                            <EmployeeRow 
                                key={employee.id}
                                row={row}  
                                employee={employee} 
                                gridCellArray = {dateRange.map((date)=>{
                                    const shift = employee.shifts.find((shift)=>shift.date === date.date)
                                    const availablility = undefined
                                    const timeOff = undefined
                                    return(
                                        {
                                            date:date,
                                            shift:shift,
                                            availablility:availablility,
                                            timeOff:timeOff
                                        }
                                    )
                                })}>

                            </EmployeeRow>
                        )
                    })}
                </Flex>
            </GridNavigationProvider>
            
                
            
        </Flex>
      
    )
}
export default Week;