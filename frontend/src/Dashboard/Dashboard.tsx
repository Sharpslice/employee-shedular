
import { useEffect, useState } from "react"
import {DateTime} from 'luxon'
import axios from "axios";
import Header from "./Header";
import { Container} from "@mantine/core";
import { Outlet, useParams } from "react-router-dom";

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
    // const [date,setDate]= useState<string | null>(DateTime.local().toISODate())
    // const [view,setView] = useState<'day' | 'week' | 'bi-week' | 'month'>('week')
    const {view,date} = useParams();
    const [dateRange,setDateRange] = useState<DayElement[]>([]) 

    const safeView = view ?? 'week'
    const safeDate = date ?? DateTime.local().toISODate()

    useEffect(()=>{
        const fetchData =async() =>{
            
            const response = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/date?date=${safeDate}&view=${ safeView}`)
            setDateRange(response.data.dateArray)
            console.log("hi",response.data.dateArray)
        }
        fetchData()
    },[safeDate,safeView])

    return(
        <>  
            <Header view={safeView} date={safeDate} />
            
             <Container fluid  style={{backgroundColor:'lightgray',width:'100%',display:'flex',justifyContent:'center',padding:'0'}}>
                <Outlet context={{dateRange}}/>
            </Container> 
            
            





        </>
    )
}

export default Dashboard