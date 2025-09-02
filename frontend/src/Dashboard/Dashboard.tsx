
import { useEffect, useState } from "react"
import {DateTime} from 'luxon'
import axios from "axios";
import Header from "./Header";
import { Container} from "@mantine/core";
import { Outlet, useParams } from "react-router-dom";
import EmployeeBoard from "./EmployeeBoard";
import type { Employee } from "./Interfaces/Employee";
import type { Day } from "./Interfaces/Day";
import type { Shift } from "./Interfaces/Shift";


type CalendarResponse ={
    dateArray: Day[]
   
    
}

interface ScheduleResponse{
    scheduleMap: Map<number,Shift[]>
}
function Dashboard(){   
    // const [date,setDate]= useState<string | null>(DateTime.local().toISODate())
    // const [view,setView] = useState<'day' | 'week' | 'bi-week' | 'month'>('week')
    const {view,date} = useParams();
    const [dateRange,setDateRange] = useState<Day[]>([]) 
    const [shifts, setShifts] = useState<Map<number,Shift[]>>(new Map())
    const [employeeList, setEmployeeList] = useState<Employee[]>([])


    const safeView = view ?? 'week'
    const safeDate = date ?? DateTime.local().toISODate()

    useEffect(()=>{
        const fetchData =async() =>{
            
            const response = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/date?date=${safeDate}&view=${ safeView}`)
            setDateRange(response.data.dateArray)
            console.log(response.data.dateArray)
            try{
                const scheduleResponse = await axios.get<ScheduleResponse>(`http://localhost:3000/api/employee/schedule/${safeView}/${safeDate}`)
                console.log(scheduleResponse.data.scheduleMap)
                setShifts(scheduleResponse.data.scheduleMap)
            }catch(error){
                console.error(error);
            }
            
            
          
        }
        fetchData()
    },[safeDate,safeView])

    return(
        <>  
            <Header view={safeView} date={safeDate} />
            
             <Container fluid style={{backgroundColor:'lightgray',width:'100%',display:'flex',justifyContent:'center',alignItems:'flex-start',padding:'0'}}>
                <EmployeeBoard employeeList={employeeList} setEmployeeList={setEmployeeList}/>
                <Outlet context={{dateRange,shifts,employeeList}}/>
            </Container> 
            
            





        </>
    )
}

export default Dashboard