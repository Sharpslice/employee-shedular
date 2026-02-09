import { Flex, Text } from "@mantine/core"

import { DateTime } from "luxon"


const convertTo12hr = (time:string | null)=>{
    
    if(!time) return ""
    const dt = DateTime.fromISO(time)
    return dt.toFormat('hh:mm a')
}


interface ShiftDisplayProps{
    start_time: string,
    end_time: string,
    hasConflict: boolean
}



function ShiftDisplay({start_time,end_time,hasConflict}:ShiftDisplayProps){
 
    return(
         <Flex  bg={hasConflict ? 'red' : 'green'} gap={10}>
            <Text fz={14}>{convertTo12hr( start_time)}</Text>  
            <Text fz={14}>-</Text>
            <Text fz={14}>{convertTo12hr(end_time)}</Text>
            
        </Flex>
    )
}

export default ShiftDisplay