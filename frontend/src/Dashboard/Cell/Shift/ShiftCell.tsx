import { Box, Text } from "@mantine/core";
import type { Shift } from "../../Interfaces/Shift";
import {DateTime} from 'luxon'
interface PlaceholderProp{
    shift:Shift
}

const convertTo12hr = (time:string | null)=>{
    if(!time) return ""
    const dt = DateTime.fromFormat(time,'HH:mm:ss');
    return dt.toFormat('hh:mm a')
}

function ShiftCell({shift}:PlaceholderProp){

    const start_time = convertTo12hr(shift.start_time)
    const end_time = convertTo12hr(shift.end_time)

    return (<>
        <Box display={"flex"} style={{justifyContent:'center'}}> 

           <Text>{start_time}</Text>  
           <Text>-</Text>
           <Text>{end_time}</Text>


        </Box>
    


    
    </>)
}

export default ShiftCell;