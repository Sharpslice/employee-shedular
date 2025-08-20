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
function getMonthName(monthNumber:number){
        const month = new Date(2000,monthNumber-1,1);
        return month.toLocaleString('default',{month:'short'})
    }

function DateCell({key,day}: PropsWithChildren<Props>){
    
    return (<>
        <Box key={key} sx={{
            backgroundColor: day.month != 8?'rgba(0,0,0,0.1)': "transparent",
            width:'100%', height:'100%',border:'1px solid grey',borderRadius:'0',
            display:'flex',flexDirection:'column',alignItems:'flex-end'
            }}>
            <Box component='span'>
                {day.month==8?day.day_of_month: `${getMonthName(day.month)} ${day.day_of_month}`}
            </Box>
            
        </Box>
    </>)
}

export default DateCell;