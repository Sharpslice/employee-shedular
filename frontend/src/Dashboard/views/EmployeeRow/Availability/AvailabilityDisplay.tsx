import { Flex, Text } from "@mantine/core"
import { DateTime } from "luxon"
import type { TimeBlock } from "../../../Interfaces/TimeBlock"
import type { exception_time_blocks } from "../../../Interfaces/weekly_time_block"

const convertTo12hr = (time:string | null)=>{
    
    if(!time) return ""
    const dt = DateTime.fromISO(time)
    return dt.toFormat('hh:mm a')
}

interface prop{
    time_block:TimeBlock | null | exception_time_blocks
}
    

function AvailabilityDisplay({time_block}:prop){
    if(!time_block) return(
        <Flex flex={1} justify={'center'} align={'center'}h={'100%'} gap={10}   >
                <Text  fz={15}>{'--'}</Text>  
                <Text  fz={15}>-</Text>
                <Text  fz={15}>{'--'}</Text>

                
                
            </Flex>

    )
    return(
        <>
            <Flex flex={1} justify={'center'} align={'center'}h={'100%'} gap={10}   >
                <Text  fz={15}>{convertTo12hr( time_block.start_time)}</Text>  
                <Text  fz={15}>-</Text>
                <Text  fz={15}>{convertTo12hr(time_block.end_time)}</Text>

                
                
            </Flex>
        </>
         
    )
}

export default AvailabilityDisplay