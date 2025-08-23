
import { useEffect, useState } from "react"
import {DateTime} from 'luxon'
import axios from "axios";
import Header from "./Header";



function Dashboard(){   
    const [dateValue,setDateValue]= useState<string | null>(DateTime.local().toISODate())
    const [view,setView] = useState<'day' | 'week' | 'bi-week' | 'month'>('week')

    useEffect(()=>{
        const fetchData =async() =>{
            const response = await axios.get(`http://localhost:3000/api/calendar/date?date=${dateValue}&view=${view}`)

            console.log(response.data.dateArray)
        }
        fetchData()
    },[dateValue,view])

    return(
        <>  
            <Header dateValue={dateValue} setDateValue={setDateValue} view={view} setView={setView}/>
            
            
            





        </>
    )
}

export default Dashboard