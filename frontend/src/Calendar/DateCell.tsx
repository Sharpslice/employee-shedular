import { Box } from "@mui/material";
import type { PropsWithChildren } from "react";


type MonthElement = {
    week:number,
    date: Date,
    days_of_week:number,
    day_of_month:number
    month: number
}
type Props ={
    key: string
    day: MonthElement
}


function DateCell({key,day}: PropsWithChildren<Props>){
    
    return (<>
        <Box key={key} sx={{
            backgroundColor: day.month != 8?'rgba(0,0,0,0.1)': "transparent",
            width:'100%', height:'100%',border:'1px solid grey',borderRadius:'0'
            }}>

            {day.month==8?day.day_of_month: `${day.month} ${day.day_of_month}`}
        </Box>
    </>)
}

export default DateCell;