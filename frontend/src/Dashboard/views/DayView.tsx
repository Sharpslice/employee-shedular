import { Box, Group } from "@mantine/core"

import { useOutletContext } from "react-router-dom"
import type { Shift } from "../Interfaces/Shift"
import type { Employee } from "../Interfaces/Employee"
type DayElement ={
    week:number,
    date: string,
    days_of_week:number,
    day_of_month:number
    month: number
}




function DayView(){
    const { dateRange,shifts,employeeList } = useOutletContext<{ dateRange: DayElement[],shifts:Map<number,Shift[]>, employeeList:Employee[] }>();
    
    const workHours = ['9 am', '10 am','11 am', '12 pm' ,'1 am', '2 am', '3 am', '4 am', '5 am']
    console.log(shifts)
    return(
    <>
        <Box display={'grid'} w={'100%'} style={{gridTemplateColumns:'repeat(9,1fr)'}}>
            {workHours.map((time)=>{
                return (
                    <Box key={time}>{time}</Box>
            
                )
            })}
           


        </Box>    
            





    </>
    )
}

export default DayView;