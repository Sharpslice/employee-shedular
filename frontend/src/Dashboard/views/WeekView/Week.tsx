import { Flex } from "@mantine/core";
import { useOutletContext} from "react-router-dom";

import type { Employee } from "../../Interfaces/Employee";
import type { Day } from "../../Interfaces/Day";
import EmployeeRow from "../EmployeeRow/EmployeeRow";

import ViewHeader from "./View-header";
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";


import WeekHeaderCell from "./WeekHeaderCell";

import { GridNavigationProvider } from "../GridNavigation/GridNavigationContext";
import type { Shift } from "../../Interfaces/Shift";
import axios from "axios";
import {  useMemo } from "react";
import type { Availability } from "../../Interfaces/Availability";
import { DateTime } from "luxon";
import type { TimeBlock } from "../../Interfaces/TimeBlock";
import { handleDragEnd } from "./dragUtil";





function Week(){
    const { dateRange,employeeList,setShifts,shifts, availabilities,av_time_blocks } = 
    useOutletContext<{ dateRange: Day[],employeeList:Map<number,Employee>,setEmployeeList:React.Dispatch<React.SetStateAction<Map<number,Employee>>>,shifts:Map<number,Shift>,setShifts:React.Dispatch<React.SetStateAction<Map<number,Shift>>>,availabilities:Map<number,Availability>,av_time_blocks:Map<number,TimeBlock> }>();

    const shiftsByEmployee = useMemo(()=>{
        const map = new Map<number,Shift[]>();


        for(const shift of shifts.values()){
            if(map.has(shift.employee_id)){
                
                map.get(shift.employee_id)?.push(shift)
            }
            else{
                map.set(shift.employee_id, [shift])
            }
        }
    
        return map
    },[shifts])
    const timeBlocksByEmployeeAndDow = useMemo(() => {
    const result = new Map<number, Map<number, TimeBlock[]>>();

    for (const block of av_time_blocks.values()) {
        const avail = availabilities.get(block.employee_availability_id);
        if (!avail) continue;

        const employeeId = avail.employee_id;
        const dow = avail.day_of_week;

        if (!result.has(employeeId)) {
        result.set(employeeId, new Map());
        }

        const dowMap = result.get(employeeId)!;

        if (!dowMap.has(dow)) {
        dowMap.set(dow, []);
        }

        dowMap.get(dow)!.push(block);
    }

  // Sort blocks within each day (optional but nice for display)
  for (const dowMap of result.values()) {
    for (const blocks of dowMap.values()) {
      blocks.sort((a, b) => 
        DateTime.fromISO(a.start_time).toMillis() - 
        DateTime.fromISO(b.start_time).toMillis()
      );
    }
  }

  return result;
}, [availabilities, av_time_blocks]);
   console.log(timeBlocksByEmployeeAndDow)

   const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: {
        delay: 250,       // milliseconds to hold before drag starts
        tolerance: 5,     // pixels pointer can move before drag starts
        },
    })
    );
    



    if (!employeeList.size || !dateRange.length) return null;
    
    
    return (
        <Flex w={'100%'} gap={5} direction={"column"}>
            <ViewHeader colGap={5}>
                {dateRange.map((day)=>(
                    <WeekHeaderCell key={day.date} day={day}/>
                ))}
            </ViewHeader>

            <GridNavigationProvider>
                <DndContext sensors ={sensors} onDragEnd={(event:DragEndEvent)=>{handleDragEnd(event,shifts,setShifts)}}>
                    <Flex gap={10} direction={'column'}
                        onContextMenu={(e)=>e.preventDefault()}
                    
                    >
                        {[...employeeList].map(([id,employee],row)=>{     

                            const employeeShifts = shiftsByEmployee.get(id) ?? [];
                            const time_blocks_DOW = timeBlocksByEmployeeAndDow.get(id) ?? new Map()
                            
                            return(
                                <EmployeeRow key={id} 
                                    row={row} 
                                    employee={employee} 
                                    shifts={employeeShifts} 
                                    time_blocks_DOW={time_blocks_DOW}
                                    />
                            )
                        })}
                        
                    </Flex>
                </DndContext>
            </GridNavigationProvider>
            
                
            
        </Flex>
      
    )
}
export default Week;