
import {  useEffect, useState } from "react"
import {DateTime} from 'luxon'
import axios from "axios";
import Header from "./Header";
import { Container} from "@mantine/core";
import { Outlet, useMatch, useParams } from "react-router-dom";

import type { Employee } from "./Interfaces/Employee";
import type { Day } from "./Interfaces/Day";
import { useSocket } from "../SocketContext";
import { ArrayToMap } from "./views/ArrayToMap";

import { ContextMenuProvider } from "./Slot/ContextMenu/ContextMenuProvider";
import ContextMenu from "./Slot/ContextMenu/ContextMenu";
import type { Override } from "./Interfaces/Override";
import type { Shift } from "./Interfaces/Shift";



type CalendarResponse ={
    dateArray: Day[]
}
interface EmployeeResponse{
    employeeList: Employee[]
}


function Dashboard(){   
    const {date} = useParams();
    const [dateRange,setDateRange] = useState<Day[]>([]) 
    const [employeeList, setEmployeeList] = useState<Map<number,Employee>>(new Map())

    const isWeek = useMatch('schedule/week/*')
    const isDay = useMatch('schedule/day/*')
    const isMonth = useMatch('schedule/month/*')

    const safeView = isWeek ? 'week' : isDay ? 'day' : isMonth ? 'month' : ''
    const safeDate = date ?? DateTime.local().toISODate()
  

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
            console.log(employeeList)
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
       
  
        
    },[socket])

    useEffect(()=>{
        const fetchData =async() =>{
            
            const response = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/date?date=${safeDate}&view=${ safeView}`,{withCredentials:true})
            setDateRange(response.data.dateArray)
       
    
            const employeeResponse = await axios.get<EmployeeResponse>(`http://localhost:3000/api/employee?date=${safeDate}&view=${safeView}`,{withCredentials:true});
            console.log(ArrayToMap( employeeResponse.data.employeeList))
            setEmployeeList(ArrayToMap(  employeeResponse.data.employeeList))
            console.log('remounts')
        }
        fetchData()
    },[safeDate,safeView])

    return(
        <>  
        

        
            <Header view={safeView} selectedDate={safeDate} />
            <ContextMenuProvider>

                <ContextMenu/>
                    <Container  fluid p={'1rem 1rem'} w={'100%'} h={'100%'} style={{backgroundColor:'lightgray'}}>

                        {dateRange.length!=0 && employeeList.size!=0 &&  <Outlet  context={{safeView,dateRange,employeeList}}/>}
                    
                    </Container> 
            </ContextMenuProvider>
            





        </>
    )
}

export default Dashboard