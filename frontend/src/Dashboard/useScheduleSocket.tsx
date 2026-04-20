import { useEffect } from "react";
import { useSocket } from "../SocketContext";
import type { Shift } from "./Interfaces/Shift";
import { useScheduleStore } from "../scheduleStore";
import { DateTime } from "luxon";




function useScheduleSocket(
){

    const socket = useSocket()
    
  
    useEffect(()=>{
        if(!socket) return
        // socket?.on('copyOverLastWeekshift',(shiftsArray:Shift[])=>{
        //     console.log('copy over')
        //     console.log(shiftsArray)
            
        //    setShifts(()=>{
        //         const newMap = new Map()

        //         shiftsArray.map((shift)=>{
        //             newMap.set(shift.id,shift)
        //         })


        //         return newMap;
        //    })

        // })


        // socket?.on('shift:remove', (draggedShift) => {
        //     console.log('shift:remove, ',draggedShift)
        //     const date = DateTime.fromISO(draggedShift.date,{ zone: 'utc' }).toISODate()!
        //     useScheduleStore.getState().removeShift(draggedShift.employee_id,date,draggedShift.shift_id)
            
            
        // })
        // socket?.on('shift:add', (shift) => {
        //     console.log('shift:remove, ',shift)
        //     const date = DateTime.fromISO(shift.date,{ zone: 'utc' }).toISODate()!
        //     useScheduleStore.getState().addShift(shift.employee_id,date,shift.shift)
            
            
        // })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleShiftMoved = ({ remove, add,socket_id:origin_socket_id }:any)=>{
            //if(origin_socket_id ===socket?.id) return
            const removeDate = DateTime.fromISO(remove.date, { zone: 'utc' }).toISODate()!
            const addDate = DateTime.fromISO(add.date, { zone: 'utc' }).toISODate()!
            console.log('is there conflict?: ', add.shift.status)
            useScheduleStore.getState().addShift(add.employee_id, addDate, add.shift)
            useScheduleStore.getState().removeShift(remove.employee_id, removeDate, remove.shift_id)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleAvailabilityUpdate =({exception}:any)=>{
            console.log('availability update: ',exception)
            console.log('exception shape:', exception)
            console.log('time_blocks:', exception?.time_blocks[0])
            const date = DateTime.fromISO(exception.date,{zone:'utc'}).toISODate()!
            useScheduleStore.getState().updateWeeklyAvailability(exception.employee_id,date,exception.time_blocks[0])
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleShiftAdd =(shift:Shift)=>{
            console.log('shift created')
            console.log('status', shift.status)
            console.log(shift.date)
            const date = DateTime.fromISO(shift.date,{zone:'utc'}).toISODate()!
            useScheduleStore.getState().addShift(shift.employee_id,date,shift)
        }
        const handleShiftRemove=(shift:Shift)=>{
            console.log('shift removed: ',shift)
            const date = DateTime.fromISO(shift.date,{zone:'utc'}).toISODate()!
            useScheduleStore.getState().removeShift(shift.employee_id,date,shift.id)

        }
        socket?.on('shift:moved', handleShiftMoved)
        socket?.on('availability:update',handleAvailabilityUpdate)
        socket?.on('shift:add',handleShiftAdd)
        socket?.on('shift:remove',handleShiftRemove)
        

        return () => {
            socket?.off('shift:moved', handleShiftMoved)
            socket?.off('availability:update', handleAvailabilityUpdate)
        }
        
        
},[socket])
}

export default useScheduleSocket;

