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

import {  useMemo } from "react";
import type { Availability } from "../../Interfaces/Availability";

import type { TimeBlock } from "../../Interfaces/TimeBlock";
import { handleDragEnd } from "./dragUtil";
import type { Override } from "../../Interfaces/Override";
import type { OvTimeBlock } from "../../Interfaces/OvTimeBlock";





function Week(){
    const { dateRange,employeeList,setShifts,shifts, availabilities,av_time_blocks,overrides,ov_time_blocks } = 
    useOutletContext<{ 
        dateRange: Day[],
        employeeList:Map<number,Employee>,setEmployeeList:React.Dispatch<React.SetStateAction<Map<number,Employee>>>,
        shifts:Map<number,Shift>,setShifts:React.Dispatch<React.SetStateAction<Map<number,Shift>>>,
        availabilities:Map<number,Availability>,av_time_blocks:Map<number,TimeBlock> 
        overrides:Map<number,Override>, ov_time_blocks:Map<number,OvTimeBlock>
    
    }>();

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

    const overridesByEmployee = useMemo(()=>{
        const map = new Map<number,Override[]>();


        for(const override of overrides.values()){
            if(map.has(override.employee_id)){
                map.get(override.employee_id)?.push(override)
            }
            else{
                map.set(override.employee_id,[override])
            }
        }
        return map


    },[overrides])
    //something wrong with this map
        console.log('overide',overrides)
        console.log('override by employee',overridesByEmployee)

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

        return result;
    }, [availabilities, av_time_blocks]);

    


    const overrideTimeBlockByEmployeeAndDate =useMemo(()=>{
        const newMap = new Map<number,Map<string,OvTimeBlock[]>>()

        for(const block of ov_time_blocks.values()){
            const override = overrides.get(block.employee_time_override_id);
            if(!override) continue;

            const employee_id = override.employee_id;
            const date = override.date;

            if(!newMap.has(employee_id)){
                newMap.set(employee_id,new Map())
            }
            const dateMap = newMap.get(employee_id)!;
            
            if(!dateMap.has(date)){
                dateMap.set(date,[])
            }
            dateMap.get(date)!.push(block)
        }
        console.log(newMap)
        return newMap

    },[overrides,ov_time_blocks])






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
                            const employeeOverrides = overridesByEmployee.get(id)?? [];
                            const time_blocks_DOW = timeBlocksByEmployeeAndDow.get(id) ?? new Map()
                            const ov_time_blocks_date = overrideTimeBlockByEmployeeAndDate.get(id) ?? new Map()
                            return(
                                <EmployeeRow key={id} 
                                    row={row} 
                                    employee={employee} 
                                    shifts={employeeShifts} 
                                    overrides= {employeeOverrides}
                                    time_blocks_DOW={time_blocks_DOW}
                                    ov_time_blocks_date = {ov_time_blocks_date}
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