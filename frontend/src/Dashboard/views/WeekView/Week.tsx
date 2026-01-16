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




function Week(){
    const { dateRange,employeeList,setEmployeeList,shifts } = 
    useOutletContext<{ dateRange: Day[],employeeList:Map<number,Employee>,setEmployeeList:React.Dispatch<React.SetStateAction<Map<number,Employee>>>,shifts:Shift[] }>();

   

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

        console.log(`Dragged shift ${active.id} into droppable ${over.id} owned by ${over.data.current?.employee_name}`);

//         setEmployeeList((oldMap)=>{
//             const newMap = new Map(oldMap); 
    
//             const dragEmployee = oldMap.get(active.data.current.employee_id)!;
//             const dropEmployee = oldMap.get(over.data.current.employee_id)!;

//             const selectedShift = dragEmployee.shifts.find((shift)=>shift.id === active.id)
//             if(!selectedShift) return oldMap;

//             const updateShift = {
//                 ...selectedShift,
//                 date:over.data.current.date.date,
//                 employee_id: dropEmployee.id
//             }


//             let dragArray:Shift[] =[];
//             let dropArray:Shift[] = [];
//             if(dragEmployee.id === dropEmployee.id)
//             {
//                 const withoutArray = dragEmployee.shifts.filter((shift)=>shift.id !==active.id)
//                 const updatedArray = [...withoutArray,updateShift]
//                 newMap.set(dragEmployee.id,{...dragEmployee,shifts:updatedArray})
            
//             }
//             else
//             {
//                 dragArray = dragEmployee.shifts.filter((shift)=>shift.id !==active.id)
            
            
//                 dropArray = [
//     ...dropEmployee.shifts.filter(s => s.id !== updateShift.id),
//     updateShift
// ]

//                 newMap.set(dragEmployee.id,{...dragEmployee,shifts:dragArray})
        

//                 newMap.set(dropEmployee.id,{...dropEmployee,shifts:dropArray})
//             }
            

            
//             return newMap;

//         })

        try {
            await axios.patch(
                `http://localhost:3000/api/employee/shift/moveShift/${active.id}`,
                {
                employee_id: over.data.current.employee_id,
                date: over.data.current.date.date,

                }
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
                    <WeekHeaderCell key={day.days_of_week} day={day}/>
                ))}
            </ViewHeader>

            <GridNavigationProvider>
                <DndContext sensors ={sensors} onDragEnd={handleDragEnd}>
                    <Flex gap={10} direction={'column'}
                        onContextMenu={(e)=>e.preventDefault()}
                    
                    >
                        {[...employeeList].map(([id,employee],row)=>{     

                            const employeeShift = shifts.filter((shift)=> shift.employee_id === employee.id)
                            console.log(employeeShift)
                            return(
                                <EmployeeRow key={id} row={row} employee={employee} shifts={employeeShift}  />
                            )
                        })}
                        
                    </Flex>
                </DndContext>
            </GridNavigationProvider>
            
                
            
        </Flex>
      
    )
}
export default Week;