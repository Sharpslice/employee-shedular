import { Box, Group } from "@mantine/core"

import { useOutletContext } from "react-router-dom"
type DayElement ={
    week:number,
    date: string,
    days_of_week:number,
    day_of_month:number
    month: number
}


function DayView(){
    const { dateRange } = useOutletContext<{ dateRange: DayElement[] }>();
    return(
    <>
        <Group>
            {dateRange.map((day)=>{
                

                return (
                    <Box key={day.date} style={{border:'1px solid black'}}>
                        {day.day_of_month}
                    </Box>

                    
                )
            })}
        </Group>    
            





    </>
    )
}

export default DayView;