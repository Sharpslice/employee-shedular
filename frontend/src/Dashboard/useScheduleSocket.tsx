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
    
    const addToMapOverride = (oldMap:Map<number,Override>,override:Override)=>{
        const newMap = new Map(oldMap)
        if(newMap.has(override.id)) return oldMap;
        newMap.set(override.id,override)
        return newMap
    }
    const removeFromMapOverride = (oldMap:Map<number,Override>,override:Override)=>{
        
            const newMap = new Map(oldMap);
            newMap.delete(override.id)
            return newMap;
     
    }
    const addToMapShift = (oldMap:Map<number,Shift>, shift: Shift) =>{
        const newMap = new Map(oldMap)
        newMap.set(shift.id,shift)
        return newMap
    }
    const removeFromMapShift = (oldMap:Map<number,Shift>,shift:Shift)=>{
            const newMap = new Map(oldMap);
            newMap.delete(shift.id)
            return newMap;
     
    }
  
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

            setOverrides((oldMap)=>removeFromMapOverride(oldMap,override))
            
        })
        socket?.on('addOverride',(override)=>{
            setOverrides((oldMap) => addToMapOverride(oldMap,override))
        })

        socket?.on('manualTimeOverride',(data)=>{
            console.log('override created')

            const override = data.override;
            const time_block = data.time_block;
            console.log(override,time_block)


            setOverrides((oldMap) => addToMapOverride(oldMap,override))

            setOv_time_blocks((oldMap)=>{
                const newMap = new Map(oldMap)
                newMap.set(time_block.id,time_block)
                return newMap
            })
            
        })
        
        socket?.on('shiftUpdated',(shift:Shift)=>{
            console.log('shiftUpdated',shift)
           
            setShifts((oldMap)=>addToMapShift(oldMap,shift))
            
        })
        socket?.on('shiftAdded',(shift:Shift)=>{
            console.log("adding shift")
            setShifts((oldMap)=> addToMapShift(oldMap,shift))
        })
        socket?.on('shiftDeleted',(data)=>{
            console.log("deleting shift", data)

            const shift = data.shift;
            const override = data.override;

            
            setShifts((oldMap)=> removeFromMapShift(oldMap,shift))

            if(override.id){
                console.log('override deleting')
                setOverrides((oldMap)=>removeFromMapOverride(oldMap,override))
            }
            
        })
       socket?.on('shiftMoved',(shift:Shift)=>{
            console.log('shift moved',shift)

            setShifts((oldMap)=> addToMapShift(oldMap,shift))
            
           
       })
  
        socket?.on('overrideStatusUpdated',(override:Override)=>{
            console.log(override)


            setOverrides((oldMap)=>{
                const newMap = new Map(oldMap)
                //if(newMap.has(override.id)) return oldMap;
                newMap.set(override.id,override)
                return newMap
            })
        })
    },[socket,setShifts])
}

export default useScheduleSocket;

