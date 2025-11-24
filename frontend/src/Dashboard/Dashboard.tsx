
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
        socket?.on('shiftAdded',(data)=>{
            console.log(data)

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
            
            <Container fluid p={'1rem 1rem'} w={'100%'} h={'100%'} style={{backgroundColor:'lightgray'}}>
            
                {dateRange.length!=0 && employeeList.size!=0 &&  <Outlet  context={{safeView,dateRange,employeeList}}/>}
            
            </Container> 
       
            





        </>
    )
}

export default Dashboard