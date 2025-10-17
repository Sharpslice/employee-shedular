import { Box, Text,Flex, TextInput } from "@mantine/core";
import { useOutletContext} from "react-router-dom";

import type { Employee } from "../../Interfaces/Employee";
import type { Day } from "../../Interfaces/Day";
import EmployeeRow from "../EmployeeRow";
import {DateTime} from 'luxon'
import ViewHeader from "./View-header";
import ShiftCell from "../../Slot/Shift/ShiftCell";
import React, { useMemo} from "react";
import SlotContainer from "../../Slot/SlotContainer";






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
    const { dateRange,employeeList } = useOutletContext<{ dateRange: Day[],employeeList:Employee[] }>();

    const today = DateTime.now().startOf('day').toISODate()

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
                    const isToday = today === DateTime.fromISO(day.date).toUTC().toISODate()
                    return (
                        <Flex key={day.date} flex={1} direction={'column'}>
                            <Box  bg={isToday ? 'blue': undefined}  
                                    flex={1} style={{border:'1px solid black', textAlign:"center"}}>
                                    <Text c={isToday? 'white': undefined} fw={isToday? 'bold': undefined}>
                                        {`${weekDayFromIndex(day.days_of_week)} ${day.day_of_month}`}
                                    </Text>       
                            </Box>
                            <TextInput 
                                variant="unstyled"
                                bd={'1px solid black'}
                                p={2}
                                styles={{input:{padding:'10px',fontSize:'18px'}}}
                            />
                        </Flex>
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
                                    <SlotContainer>
                                        {shift && <ShiftCell  shift={shift}/>}
                                        {shift && <ShiftCell  shift={shift}/>}
                                    </SlotContainer>
                                        // <Flex direction={'column'}  flex={1}>
            
                                        //     {shift && <ShiftCell  shift={shift}/>}
                                        
                                        // </Flex>
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