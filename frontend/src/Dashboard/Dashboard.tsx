
import {  useEffect, useState } from "react"
import {DateTime} from 'luxon'
import axios from "axios";
import Header from "./Header";
import { Container} from "@mantine/core";
import { Outlet, useMatch, useParams } from "react-router-dom";

import type { Employee } from "./Interfaces/Employee";
import type { Day } from "./Interfaces/Day";

import { EmployeeArrayToMap,ShiftArrayToMap } from "./views/ArrayToMap";

import { ContextMenuProvider } from "./Slot/ContextMenu/ContextMenuProvider";
import ContextMenu from "./Slot/ContextMenu/ContextMenu";
import useScheduleSocket from "./useScheduleSocket";
import type { Shift } from "./Interfaces/Shift";




type CalendarResponse ={
    dateArray: Day[]
}
interface EmployeeResponse{
    employeeList: Employee[]
    shifts: Shift[]
}


function Dashboard(){   
    const {date} = useParams();
    const [dateRange,setDateRange] = useState<Day[]>([]) 

    

    const [employeeList,setEmployeeList] = useState<Map<number,Employee>>(new Map())
    const [shifts,setShifts] = useState<Map<number,Shift>>(new Map())
    const isWeek = useMatch('schedule/week/*')
    const isDay = useMatch('schedule/day/*')
    const isMonth = useMatch('schedule/month/*')

    const safeView = isWeek ? 'week' : isDay ? 'day' : isMonth ? 'month' : ''
    const safeDate = date ?? DateTime.local().toISODate()
  

    //useScheduleSocket(setEmployeeList);

    useEffect(()=>{
        const fetchData =async() =>{
            
            const response = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/date?date=${safeDate}&view=${ safeView}`,{withCredentials:true})
            setDateRange(response.data.dateArray)
       
    
            const employeeResponse = await axios.get<EmployeeResponse>(`http://localhost:3000/api/employee/${safeDate}/${safeView}`,{withCredentials:true});
            
            setEmployeeList(EmployeeArrayToMap( employeeResponse.data.employeeList))
            setShifts(ShiftArrayToMap(employeeResponse.data.shifts));
            console.log(EmployeeArrayToMap( employeeResponse.data.employeeList))
            console.log(ShiftArrayToMap(employeeResponse.data.shifts))
            console.log('fetching api call')

        }
        fetchData()
    },[safeDate,safeView])

    return(
        <>  
        

        
            <Header view={safeView} selectedDate={safeDate} />
            <ContextMenuProvider>
                
                <ContextMenu/>
                    <Container  fluid p={'1rem 1rem'} w={'100%'} h={'100%'} style={{backgroundColor:'lightgray'}}>

                        {       dateRange.length!=0 
                            &&  employeeList.size!=0 
                            &&  <Outlet  context={{safeView,dateRange,employeeList,setEmployeeList,shifts,setShifts}}/>
                        }
                    
                    </Container> 
            </ContextMenuProvider>
            





        </>
    )
}

export default Dashboard