import { useEffect } from "react";
import { useSocket } from "../SocketContext";
import type { Shift } from "./Interfaces/Shift";
import type { OvTimeBlock } from "./Interfaces/OvTimeBlock";

import type { Override } from "./Interfaces/Override";


function useScheduleSocket(setShifts: React.Dispatch<React.SetStateAction<Map<number,Shift>>>,
    setOverrides: React.Dispatch<React.SetStateAction<Map<number,Override>>>,
    setOv_time_blocks: React.Dispatch<React.SetStateAction<Map<number,OvTimeBlock>>>

){
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
        socket?.on('overrideDeleted',(override:Override)=>{
            console.log("deleting override", override)

            
            setOverrides((oldMap)=>{
                const newMap = new Map(oldMap);

                newMap.delete(override.id)
                return newMap;

            })
            
        })
        socket?.on('addOverride',(override)=>{
             setOverrides((oldMap)=>{
                const newMap = new Map(oldMap)
                if(newMap.has(override.id)) return oldMap;
                newMap.set(override.id,override)
                return newMap
            })
            

        })
        socket?.on('manualTimeOverride',(data)=>{
            console.log('override created')

            const override = data.override;
            const time_block = data.time_block;
            console.log(override,time_block)


            setOverrides((oldMap)=>{
                const newMap = new Map(oldMap)
                if(newMap.has(override.id)) return oldMap;
                newMap.set(override.id,override)
                return newMap
            })

            setOv_time_blocks((oldMap)=>{
                const newMap = new Map(oldMap)
                if(newMap.has(time_block.id)) return new Map;
                newMap.set(time_block.id,time_block)
                return newMap
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

            const shift_id = data.shift_id;
            const override_id = data.override_id;

            
            setShifts((oldMap)=>{
                const newMap = new Map(oldMap);

                newMap.delete(shift_id)
                return newMap;

            })

            if(override_id){
                console.log('override deleting')
                setOverrides((oldMap)=>{
                    const newMap = new Map(oldMap);

                    newMap.delete(override_id)
                return newMap;

            })
            }
            
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

