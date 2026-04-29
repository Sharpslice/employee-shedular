import { Flex} from "@mantine/core";

import EmployeeRow from "../EmployeeRow/EmployeeRow";

import ViewHeader from "./View-header";
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";


import WeekHeaderCell from "./WeekHeaderCell";

import { GridNavigationProvider } from "../GridNavigation/GridNavigationContext";

import { handleDragEnd } from "./dragUtil";

import { useScheduleStore } from "../../../scheduleStore";
import { useSocket } from "../../../SocketContext";





function Week(){

   const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: {
        delay: 250,       // milliseconds to hold before drag starts
        tolerance: 5,     // pixels pointer can move before drag starts
        distance:8
        },
    })
    );
    
    const socket = useSocket()

    const employees = useScheduleStore(state=>state.employees)
    const dateRange = useScheduleStore(state=>state.dateRange)
    if (!employees || !dateRange) return null;
    
    
    return (
        <Flex w={'100%'} gap={5} direction={"column"}>
            <ViewHeader colGap={5}>
                {dateRange.map((day)=>(
                    <WeekHeaderCell key={day.date} day={day}/>
                ))}
            </ViewHeader>

            <GridNavigationProvider>
                <DndContext sensors ={sensors} onDragEnd={(event:DragEndEvent)=>{handleDragEnd(event,socket?.id ?? '')}}>
                    <Flex gap={10} direction={'column'}
                        onContextMenu={(e)=>e.preventDefault()}
                    
                    >
                        {
                            employees.map((e,row)=>{
                                return(
                                    <EmployeeRow key={e.id} 
                                        row={row} 
                                        employee={e} 
                                        
                                    />
                                    
                                )
                            })
                        }                    
                    </Flex>
                </DndContext>
            </GridNavigationProvider>
            
                
            
        </Flex>
      
    )
}
export default Week;