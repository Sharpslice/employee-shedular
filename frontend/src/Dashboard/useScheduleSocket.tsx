import { useEffect } from "react";
import { useSocket } from "../SocketContext";
import type { Shift } from "./Interfaces/Shift";


function useScheduleSocket(setShifts: React.Dispatch<React.SetStateAction<Map<number,Shift>>>){
    const socket = useSocket()
    useEffect(()=>{
        socket?.on('copyOverLastWeekshift',(shiftsArray:Shift[])=>{
            console.log('copy over')
            console.log(shiftsArray)
            
           setShifts(()=>{
                const newMap = new Map()

                shiftsArray.map((shift)=>{
                    newMap.set(shift.id,shift)
                })


                return newMap;
           })

        })
        
        socket?.on('shiftUpdated',(data)=>{
            console.log('shiftUpdated',data)
            const {shift} = data
            setShifts((oldMap)=>{
                const newMap = new Map(oldMap);
                newMap.set(shift.id,shift)


                return newMap;
            })
            
        })
        socket?.on('shiftAdded',(data)=>{
            console.log("adding shift")
            

            const {shift} = data
            
            setShifts((oldMap)=>{
                const newMap = new Map(oldMap);
                if(newMap.has(shift.id)) return new Map;
                newMap.set(shift.id,shift )

                return newMap
            })
        })
        socket?.on('shiftDeleted',(data)=>{
            console.log("deleting shift", data)

            const {shift_id} = data
            setShifts((oldMap)=>{
                const newMap = new Map(oldMap);

                newMap.delete(shift_id)
                return newMap;

            })
            
        })
       socket?.on('shiftMoved',(data)=>{
            console.log('shift moved',data)

            const {updatedShift} = data;

            setShifts((oldMap)=>{
                const newMap = new Map(oldMap)

                newMap.set(updatedShift.id,updatedShift);


                return newMap
            })

       })
  
        
    },[socket,setShifts])
}

export default useScheduleSocket;

