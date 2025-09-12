
import { useEffect, useState } from "react"
import {DateTime} from 'luxon'
import axios from "axios";
import Header from "./Header";
import { Container} from "@mantine/core";
import { Outlet, useParams } from "react-router-dom";

import type { Employee } from "./Interfaces/Employee";
import type { Day } from "./Interfaces/Day";



type CalendarResponse ={
    dateArray: Day[]
}
interface EmployeeResponse{
    employeeList: Employee[]
}


function Dashboard(){   
    const {view,date} = useParams();
    const [dateRange,setDateRange] = useState<Day[]>([]) 
    const [employeeList, setEmployeeList] = useState<Employee[]>([])


    const safeView = view ?? 'week'
    const safeDate = date ?? DateTime.local().toISODate()

    

    useEffect(()=>{
        const fetchData =async() =>{
            
            const response = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/date?date=${safeDate}&view=${ safeView}`)
            setDateRange(response.data.dateArray)
       
    
            const employeeResponse = await axios.get<EmployeeResponse>(`http://localhost:3000/api/employee?date=${safeDate}&view=${safeView}`);
            
            setEmployeeList(employeeResponse.data.employeeList)
    
        }
        fetchData()
    },[safeDate,safeView])

    return(
        <>  
            <Header view={safeView} date={safeDate} />
            
             <Container fluid display={'grid'} w={'100%'} h={'100%'} style={{backgroundColor:'lightgray',padding:'1rem'}}>
                
                    <Outlet context={{dateRange,employeeList}}/>
                
                
            </Container> 
            
            





        </>
    )
}

export default Dashboard