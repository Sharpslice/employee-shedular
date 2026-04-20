import type { DragEndEvent } from "@dnd-kit/core";
import axios from "axios";
import { useScheduleStore } from "../../../scheduleStore";
import type { Shift } from "../../Interfaces/Shift";



const updateShiftPosition = async(shift_id:number,newEmployee_id:number,newDate:string,socket_id:string)=>{
    try {
            //moves shift

            console.log('api requesting')
            await axios.patch(
                `http://localhost:3000/api/v1/shifts/${shift_id}`,
                {
                    employee_id: newEmployee_id,
                    date:newDate,
                    socket_id:socket_id

                }, {withCredentials:true}
            );
       
        } catch (error) {
            console.error("Failed to update shift:", error);
            alert("Failed to move shift. Please try again.");
        }
}

export const handleDragEnd = async(event:DragEndEvent,socket_id:string)=>{
    const { active:draggedShift,over:targetSlot } = event;
    if (!targetSlot) return;
    
    //console.log(`Dragged shift ${draggedShift.id} into droppable ${targetSlot.id} owned by ${targetSlot.data.current?.employee_name}: ${targetSlot.data.current?.employee_id}`);
    //console.log('socket id,', socket_id)


    const shift:Shift = draggedShift.data?.current.shift;
    //console.log(shift)
   
    const target_employee_id = targetSlot.data?.current.employee_id
    const target_date = targetSlot.data?.current.date.date
    //console.log(target_date)
    // useScheduleStore.getState().removeShift(shift.employee_id,shift.date,shift.id)
    // useScheduleStore.getState().addShift(target_employee_id,target_date, {
    //     id:shift.id,
    //     employee_id:target_employee_id,
    //     date:target_date,
    //     start_time:shift.start_time,
    //     end_time:shift.end_time
    // })
    
 
    updateShiftPosition(Number(draggedShift.id),Number(targetSlot.data?.current.employee_id),targetSlot.data?.current.date.date,socket_id)
    

}


