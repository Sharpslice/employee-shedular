import { useEffect } from "react";
import { useSocket } from "../SocketContext";
import type { Employee } from "./Interfaces/Employee";
import type { Shift } from "./Interfaces/Shift";
import type { Override } from "./Interfaces/Override";

function useScheduleSocket(setEmployeeList: React.Dispatch<React.SetStateAction<Map<number,Employee>>>){
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
            console.log('shiftUpdated')
            
            setEmployeeList((oldMap)=>{
               console.log("adding shift")
            
            
                const employee = oldMap.get(data.employee_id)!

                const newShiftArray = employee.shifts.map((shift) => 
                    shift.id === data.id ? data : shift
                );
                const updatedEmployeeInfo = {
                    ...employee,
                    shifts: newShiftArray
                }

                const newMap = new Map(oldMap);
                newMap.set(data.employee_id,updatedEmployeeInfo)
                


                return newMap
            
            })
        })
        socket?.on('shiftAdded',(data)=>{
            console.log("adding shift")
            
            setEmployeeList((oldMap)=>{
                const employee = oldMap.get(data.employee_id)!

                const newShiftArray = [...employee.shifts, data]

                const updatedEmployeeInfo = {
                    ...employee,
                    shifts: newShiftArray
                }

                const newMap = new Map(oldMap);
                newMap.set(data.employee_id,updatedEmployeeInfo)
                


                return newMap
            })
        })
        socket?.on('shiftDeleted',(data)=>{
            console.log("deleting shift", data)
            setEmployeeList((oldMap)=>{
                const employee = oldMap.get(data.employee_id)!

                const newShiftArray = employee.shifts.filter((shift)=>shift.id !== data.shift_id)

                const updatedEmployeeInfo = {
                    ...employee,
                    shifts:newShiftArray
                }
                const newMap = new Map(oldMap);
                newMap.set(data.employee_id,updatedEmployeeInfo)
                console.log('newMap', newMap)
                return newMap
            })
            
        })
       socket?.on('shiftMoved',(data)=>{
            console.log('shift moved',data)

            const {oldShift, updatedShift} = data;



            setEmployeeList((oldMap)=>{
                const newMap = new Map(oldMap); 


                const oldEmployee = oldMap.get(oldShift.employee_id)!
                const updatedEmployee = oldMap.get(updatedShift.employee_id)!


                const oldArray = oldEmployee.shifts.filter((shift)=>shift.id !== updatedShift.id)
               
                 const updatedArray = [
    ...updatedEmployee.shifts.filter(
      (shift) => shift.id !== updatedShift.id
    ),
    updatedShift,
  ];

                if(oldEmployee.id === updatedEmployee.id){
                    const withoutArray = oldEmployee.shifts.filter((shift)=>shift.id !== oldShift.id)
                    const updatedArray =[...withoutArray,updatedShift]

                    
                    newMap.set(oldEmployee.id,{...oldEmployee,shifts:updatedArray})
                }
                else{
                    newMap.set(oldEmployee.id,{...oldEmployee,shifts:oldArray})
                    newMap.set(updatedEmployee.id,{...updatedEmployee,shifts:updatedArray})
                }
                
           

            

            
            return newMap;

        })
       })
  
        
    },[socket,setEmployeeList])
}

export default useScheduleSocket;

