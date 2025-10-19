import { Flex } from "@mantine/core";
import { useOutletContext} from "react-router-dom";

import type { Employee } from "../../Interfaces/Employee";
import type { Day } from "../../Interfaces/Day";
import EmployeeRow from "../EmployeeRow/EmployeeRow";

import ViewHeader from "./View-header";

import React, { useMemo} from "react";

import {EmployeeProvider} from "../EmployeeContext";
import WeekHeaderCell from "./WeekHeaderCell";

function Week(){
    const { dateRange,employeeList } = useOutletContext<{ dateRange: Day[],employeeList:Employee[] }>();

    

    const cellRefs = useMemo(() => {
        return Array.from({ length: employeeList.length }, () =>
            Array.from({ length: dateRange.length }, () => React.createRef<HTMLDivElement>())
        );
    }, [employeeList.length, dateRange.length]);

    
  

    const handleArrowKey=(key:string,row:number,col:number)=>{
        switch(key){
            case('ArrowUp'):
                cellRefs[row-1][col].current?.focus()
                break;
            case('ArrowDown'):
                cellRefs[row+1][col].current?.focus()
                break;
            case('ArrowLeft'):
                cellRefs[row][col-1].current?.focus()   
                break;
            case('ArrowRight'):
                cellRefs[row][col+1].current?.focus()
                break;
        }
    }
   
  
    if (!employeeList.length || !dateRange.length) return null;
    return (<>
        <Flex w={'100%'} gap={5} direction={"column"}>
            <ViewHeader colGap={5}>
                {dateRange.map((day)=>{
                    return (
                        <WeekHeaderCell key={day.days_of_week} day={day}/>
                    )
                    })}
            </ViewHeader>


            <Flex gap={10} direction={'column'}>
                {employeeList.map((employee,row)=>{     
                    return(
                        <EmployeeRow row={row} cellRefs ={cellRefs[row]} handleArrowKey={handleArrowKey} key={employee.id} employee={employee} dateRange={dateRange} >
                            {dateRange.map((date)=>{
                                const shift = employee.shifts.find((shift)=>shift.date === date.date)
                                return( 
                                    <EmployeeProvider value={{employee:employee, date:date, shift:shift ? shift : null}}>
                                      
                                    </EmployeeProvider>     
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