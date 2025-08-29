
import { useEffect, useState } from "react"
import {DateTime} from 'luxon'
import axios from "axios";
import Header from "./Header";
import { Container} from "@mantine/core";
import { Outlet } from "react-router-dom";

type DayElement ={
    week:number,
    date: string,
    days_of_week:number,
    day_of_month:number
    month: number
}
type CalendarResponse ={
    dateArray: DayElement[]
   
    
}
function Dashboard(){   
    const [date,setDate]= useState<string | null>(DateTime.local().toISODate())
    const [view,setView] = useState<'day' | 'week' | 'bi-week' | 'month'>('week')

    const [dateRange,setDateRange] = useState<DayElement[]>([]) 

    useEffect(()=>{
        const fetchData =async() =>{
            const response = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/date?date=${date}&view=${view}`)
            setDateRange(response.data.dateArray)
            console.log(response.data.dateArray)
        }
        fetchData()
    },[date,view])

    return(
        <>  
            <Header date={date} setDate={setDate} view={view} setView={setView}/>
            
             <Container style={{backgroundColor:'lightgray',width:'100vw', height:'100vh'}} size='100%' >
                <Outlet context={{dateRange}}/>
            </Container> 
            
            





        </>
    )
}

export default Dashboard