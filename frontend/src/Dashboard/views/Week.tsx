import { Box, Group } from "@mantine/core";
import { useOutletContext } from "react-router-dom";
import {DateTime } from 'luxon';
type DayElement ={
    week:number,
    date: string,
    days_of_week:number,
    day_of_month:number
    month: number
}
function Week(){
    const { dateRange } = useOutletContext<{ dateRange: DayElement[] }>();
    return (<>
    <Group>
                    {dateRange.map((day)=>{
                        
                        day.date = DateTime.fromISO(day.date).toISODate()!
                        return (
                            <Box style={{border:'1px solid black'}}>
                                {day.day_of_month}
                            </Box>
    
                            
                        )
                    })}
                </Group>    
    </>)
}
export default Week;