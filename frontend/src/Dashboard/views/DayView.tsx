import { Box, Flex, Group } from "@mantine/core"

import { useOutletContext } from "react-router-dom"
import type { Shift } from "../Interfaces/Shift"
import type { Employee } from "../Interfaces/Employee"
import { DateTime } from "luxon"
type DayElement ={
    week:number,
    date: string,
    days_of_week:number,
    day_of_month:number
    month: number
}




function DayView(){
    const { dateRange,shifts,employeeList } = useOutletContext<{ dateRange: DayElement[],shifts:Map<number,Shift[]>, employeeList:Employee[] }>();
    
    const workHours = ['09:00:00', '10:00:00','11:00:00', '12:00:00' ,'13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00']
    console.log(shifts)

    const convertTo12hr = (time:string | null)=>{
        if(!time) return ""
        const dt = DateTime.fromFormat(time,'HH:mm:ss');
        return dt.toFormat('h a')
    }
    return(
    <>
        <Box display={'grid'} w={'100%'} style={{gridTemplateColumns:'repeat(9,1fr)'}}>
            {workHours.map((time)=>{
                return (
                    <Box key={time}>{convertTo12hr(time)}</Box>
            
                )
            })}
           
            

        </Box>    
            





    </>
    )
}

export default DayView;