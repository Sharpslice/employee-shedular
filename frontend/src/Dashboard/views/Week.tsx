import { Box, Text,Flex, TextInput } from "@mantine/core";
import { useOutletContext} from "react-router-dom";

import type { Employee } from "../Interfaces/Employee";
import type { Day } from "../Interfaces/Day";
import type { Shift } from "../Interfaces/Shift";
import EmployeeRow from "../EmployeeRow";
import {DateTime} from 'luxon'
import ViewHeader from "./View-header";
import ShiftCell from "../Slot/Shift/ShiftCell";
import React, { useEffect, useMemo, useRef } from "react";





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

    const cellRefs = useMemo(() => {
        return Array.from({ length: employeeList.length }, () =>
            Array.from({ length: dateRange.length }, () => React.createRef<HTMLDivElement>())
        );
    }, [employeeList.length, dateRange.length]);




        const handleArrowKey=(key:string,row:number,col:number)=>{

            console.log(cellRefs)
            switch(key){
                case('ArrowUp'):

                    cellRefs[row-1][col].current?.focus()

                    console.log(row-1,col);
                    console.log('Up')
                    
                    break;
                case('ArrowDown'):
                    cellRefs[row+1][col].current?.focus()
                    console.log(row+1,col);
                    console.log('Down')
                    break;
                case('ArrowLeft'):
                    cellRefs[row][col-1].current?.focus()
                    console.log(row,col-1);
                    console.log('Left')
                    break;
                case('ArrowRight'):
                    cellRefs[row][col+1].current?.focus()
                    console.log(row,col+1);
                    console.log('Right')
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
                    return (
                        <EmployeeRow key={employee.id} row={row} employee={employee} dateRange={dateRange} >
                             {dateRange.map((date,col)=>{
                            
                                    const shift = employee.shifts.find((shift)=>shift.date === date.date)
                                    

                                    return( 
                                        <Flex  tabIndex={0} flex={1}
                                            ref={cellRefs[row]?.[col]}
                                            onKeyDown={(e)=>handleArrowKey(e.key,row,col)}
                                        
                                        >
                                            {/* <Text>{`${[row,col]}`}</Text> */}
                                             {shift && <ShiftCell shift={shift}/>}
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