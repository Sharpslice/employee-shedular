import { useEffect } from "react";
import { useSocket } from "../SocketContext";
import type { Shift } from "./Interfaces/Shift";
import type { Override } from "./Interfaces/Override";

function useScheduleSocket(setShifts: React.Dispatch<React.SetStateAction<Map<number,Shift>>>){
    const socket = useSocket()
    useEffect(()=>{
        socket?.on('copyOverLastWeekshift',(shiftsArray:Shift[])=>{
            console.log('copy over')
            console.log(shiftsArray)
            
            setEmployeeList((oldMap)=>{
             
                const newMap = new Map(oldMap)

                    //const employees = shiftsArray.map((shift)=>shift.employee_id)

                    oldMap.forEach((_,key)=>{
                        const newShiftArray = shiftsArray.filter((shift)=>{
                            return(shift.employee_id === key)
                        })
                        const employee = oldMap.get(key)!;
                        const newEmployeeInfo = {
                            ...employee,
                            shifts: newShiftArray//[...employee.shifts, ...newShiftArray]
                        }
                        newMap.set(key,newEmployeeInfo)
                    })





                
                console.log(newMap)
                return newMap
            })

// const employees = shiftsArray.map((shift)=>shift.employee_id)

                    // employees.forEach((id)=>{
                    //     const newShiftArray = shiftsArray.filter((shift)=>{
                    //         return(shift.employee_id === id)
                    //     })
                    //     const employee = oldMap.get(id)!;
                    //     const newEmployeeInfo = {
                    //         ...employee,
                    //         shifts: newShiftArray//[...employee.shifts, ...newShiftArray]
                    //     }
                    //     newMap.set(id,newEmployeeInfo)
                    // })





        })
        socket?.on('overrideCreated',(ovveride:Override)=>{

            setEmployeeList((oldMap)=>{


                const employee = oldMap.get(ovveride.employee_id)!

                const newOverrideArray = [...employee.override,ovveride ]

                const updatedEmployeeInfo  = {
                    ...employee,
                    override:newOverrideArray
                }

                const newMap = new Map(oldMap)
                newMap.set(employee.id,updatedEmployeeInfo)
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

