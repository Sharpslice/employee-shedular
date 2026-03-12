import type { DragEndEvent } from "@dnd-kit/core";
import type { Shift } from "../../Interfaces/Shift";
import { DateTime } from "luxon";
import axios from "axios";



const updateShiftPosition = async(shiftId:number,droppedEmployee:number,droppedDate:string,updatedStart:string,updatedEnd:string)=>{
    try {
            //moves shift
            await axios.patch(
                `http://localhost:3000/api/v1/shifts/${shiftId}`,
                {
                    employee_id: droppedEmployee,
                    date: droppedDate,
                    start_time: updatedStart!,
                    end_time: updatedEnd! 

                }, {withCredentials:true}
            );
       
        } catch (error) {
            console.error("Failed to update shift:", error);
            alert("Failed to move shift. Please try again.");
        }
}
const formatDate = (droppedDate:string,selectedShiftTime:string)=>{

    const formattedDate = DateTime.fromISO(droppedDate,{zone:'utc'})
    const updatedTime = DateTime.fromISO(selectedShiftTime).set({
            year: formattedDate.year,
            month: formattedDate.month,
            day: formattedDate.day
        })
    return updatedTime.toISO()
}

export const handleDragEnd = async(event:DragEndEvent,shifts:Map<number,Shift>,setShifts:React.Dispatch<React.SetStateAction<Map<number,Shift>>>)=>{
    const { active,over } = event;
    if (!over) return;

    console.log(`Dragged shift ${active.id} into droppable ${over.id} owned by ${over.data.current?.employee_name}: ${over.data.current?.employee_id}`);

    const shiftId = Number(active.id)
    const droppedDate = over.data.current.date.date;
    const droppedEmployee = over.data.current?.employee_id
    const selectedShift= shifts.get(shiftId)!
    const updatedStart = formatDate(droppedDate,selectedShift.start_time);
    const updatedEnd = formatDate(droppedDate,selectedShift.end_time);

    setShifts((oldMap)=>{
        const newMap = new Map(oldMap)
        const updatedShift = {
            ...selectedShift,
            id: selectedShift.id,          
            employee_id: droppedEmployee,  
            date: droppedDate,
            start_time: updatedStart!,
            end_time: updatedEnd! 
            
        }
        newMap.set(shiftId, updatedShift)
        console.log(updatedShift)

        return newMap
    })

    updateShiftPosition(shiftId,droppedEmployee,droppedDate,updatedStart!,updatedEnd!)
    

}