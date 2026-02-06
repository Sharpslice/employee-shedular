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





function Week(){
    const { dateRange,employeeList,setShifts,shifts, availabilities } = 
    useOutletContext<{ dateRange: Day[],employeeList:Map<number,Employee>,setEmployeeList:React.Dispatch<React.SetStateAction<Map<number,Employee>>>,shifts:Map<number,Shift>,setShifts:React.Dispatch<React.SetStateAction<Map<number,Shift>>>,availabilities:Map<number,Availability> }>();

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
    const availabilitiesByEmployee = useMemo(()=>{
        const map = new Map<number,Availability[]>()

        for(const availability of availabilities.values()){
            if(map.has(availability.employee_id)){
                
                map.get(availability.employee_id)?.push(availability)
            }
            else{
                map.set(availability.employee_id, [availability])
            }
        }
        return map
    },[availabilities])
   

   const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: {
        delay: 250,       // milliseconds to hold before drag starts
        tolerance: 5,     // pixels pointer can move before drag starts
        },
    })
    );
    
    const handleDragEnd = async(event:DragEndEvent) => {
      
        const { active,over } = event;
        if (!over) return;

        console.log(`Dragged shift ${active.id} into droppable ${over.id} owned by ${over.data.current?.employee_name}: ${over.data.current?.employee_id}`);

     
        const shiftId = Number(active.id)
        const droppedDate = over.data.current.date.date;
        const droppedEmployee = over.data.current?.employee_id
        let updatedStart;
        let updatedEnd;
        setShifts((oldMap)=>{
            const newMap = new Map(oldMap)

            //find the selected shift and replace the date and employee
            const selectedShift = oldMap.get(shiftId)!;
            
            const formattedDate = DateTime.fromISO(droppedDate,{zone:'utc'})
            updatedStart = DateTime.fromISO(selectedShift.start_time).set({
                year: formattedDate.year,
                month: formattedDate.month,
                day: formattedDate.day
            })
            updatedEnd = DateTime.fromISO(selectedShift.end_time).set({
                year: formattedDate.year,
                month: formattedDate.month,
                day: formattedDate.day
            })
            
            
            const updatedShift = {
                ...selectedShift,
                id: selectedShift.id,          
                employee_id: droppedEmployee,  
                date: droppedDate,
                start_time: updatedStart.toISO()!,
                end_time: updatedEnd.toISO()! 
               
            }

            newMap.set(shiftId, updatedShift)
            console.log(updatedShift)

            return newMap
        })
           
        
        try {
            //moves shift
            await axios.patch(
                `http://localhost:3000/api/v1/shifts/${shiftId}`,
                {
                    employee_id: droppedEmployee,
                    date: droppedDate,
                    start_time: updatedStart!.toISO()!,
                    end_time: updatedEnd!.toISO()! 

                }, {withCredentials:true}
            );
       
        } catch (error) {
            console.error("Failed to update shift:", error);
            alert("Failed to move shift. Please try again.");
        }
    
    };


    if (!employeeList.size || !dateRange.length) return null;
    
    
    return (
        <Flex w={'100%'} gap={5} direction={"column"}>
            <ViewHeader colGap={5}>
                {dateRange.map((day)=>(
                    <WeekHeaderCell key={day.date} day={day}/>
                ))}
            </ViewHeader>

            <GridNavigationProvider>
                <DndContext sensors ={sensors} onDragEnd={handleDragEnd}>
                    <Flex gap={10} direction={'column'}
                        onContextMenu={(e)=>e.preventDefault()}
                    
                    >
                        {[...employeeList].map(([id,employee],row)=>{     

                            const employeeShifts = shiftsByEmployee.get(id) ?? [];
                            const employeeAvailabilities = availabilitiesByEmployee.get(id) ?? []
                            
                            return(
                                <EmployeeRow key={id} 
                                    row={row} 
                                    employee={employee} 
                                    shifts={employeeShifts} 
                                    availabilities={employeeAvailabilities} />
                            )
                        })}
                        
                    </Flex>
                </DndContext>
            </GridNavigationProvider>
            
                
            
        </Flex>
      
    )
}
export default Week;