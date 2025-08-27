
import { useEffect, useState } from "react"
import {DateTime} from 'luxon'
import axios from "axios";
import Header from "./Header";
import { Box, Container, Group } from "@mantine/core";
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
    const [dateValue,setDateValue]= useState<string | null>(DateTime.local().toISODate())
    const [view,setView] = useState<'day' | 'week' | 'bi-week' | 'month'>('week')

    const [datesRange,setDatesRange] = useState<DayElement[]>([]) 
    useEffect(()=>{
        const fetchData =async() =>{
            const response = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/date?date=${dateValue}&view=${view}`)
            setDatesRange(response.data.dateArray)
            console.log(response.data.dateArray)
        }
        fetchData()
    },[dateValue,view])

    return(
        <>  
            <Header dateValue={dateValue} setDateValue={setDateValue} view={view} setView={setView}/>
            <Outlet/>
            {/* <Container style={{backgroundColor:'lightgray',width:'100vw', height:'100vh'}} size='100%' >

               
            <Group>

            
                {datesRange.map((day)=>{
                    
                    day.date = DateTime.fromISO(day.date).toISODate()!
                    return (
                        <Box style={{border:'1px solid black'}}>
                            {day.day_of_month}
                        </Box>

                        
                    )
                })}
            </Group>    
                
               




            </Container> */}
            
            





        </>
    )
}

export default Dashboard