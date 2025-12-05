
import {  useEffect, useState } from "react"
import {DateTime} from 'luxon'
import axios from "axios";
import Header from "./Header";
import { Container, em} from "@mantine/core";
import { Outlet, useMatch, useParams } from "react-router-dom";

import type { Employee } from "./Interfaces/Employee";
import type { Day } from "./Interfaces/Day";
import { useSocket } from "../SocketContext";
import { ArrayToMap } from "./views/ArrayToMap";

import { ContextMenuProvider } from "./Slot/ContextMenu/ContextMenuProvider";
import ContextMenu from "./Slot/ContextMenu/ContextMenu";
import type { Override } from "./Interfaces/Override";



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
            
            const response = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/date?date=${safeDate}&view=${ safeView}`)
            setDateRange(response.data.dateArray)
       
    
            const employeeResponse = await axios.get<EmployeeResponse>(`http://localhost:3000/api/employee?date=${safeDate}&view=${safeView}`);
            console.log(ArrayToMap( employeeResponse.data.employeeList))
            setEmployeeList(ArrayToMap(  employeeResponse.data.employeeList))
            console.log('remounts')
        }
        fetchData()
    },[safeDate,safeView])

    return(
        <>  
        

        
            <Header view={safeView} date={safeDate} />
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