import { Box } from "@mantine/core";
import type { Shift } from "./Interfaces/Shift";
import {DateTime} from 'luxon'
interface CellProps{
    schedule:Shift
}


function Cell({schedule}:CellProps){


    return(
    <>
    <Box  flex={1} bd={'1px solid black'} ta={'center'}>
       {`${schedule.start_time} / ${schedule.end_time}`}

    </Box>
    
    
    </>)
}

export default Cell;