import { Box, Flex } from "@mantine/core";
import { useOutletContext} from "react-router-dom";

type DayElement ={
    week:number,
    date: string,
    days_of_week:number,
    day_of_month:number
    month: number
}

function weekDayFromIndex(num:number){
    switch(num){
        case 0:
            return "Sun"
        case 1:
            return "Mon"
        case 2:
            return "Tue"
        case 3:
            return "Wed"
        case 4:
            return "Thu"
        case 5:
            return "Fri"
        case 6:
            return "Sat"
                 
    }
}

function Week(){
    const { dateRange } = useOutletContext<{ dateRange: DayElement[] }>();

  

    return (
    <>
        <Flex w={'100%'}>
            {dateRange.map((day)=>{
                return (
                    <Box key={day.date} flex={1} style={{border:'1px solid black', textAlign:"center"}}>
                        {`${weekDayFromIndex(day.days_of_week)} ${day.day_of_month}`}
                    </Box>
                )
            })}
        </Flex>
            
        
    </>)
}
export default Week;