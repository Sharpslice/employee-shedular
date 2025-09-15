import { Flex, Text } from "@mantine/core";
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
        <Flex bg={'blue'} justify={'center'} align={'center'} gap={12} mih={38} h='100%' > 

           <Text fz={14}>{start_time}</Text>  
           <Text fz={14}>-</Text>
           <Text fz={14}>{end_time}</Text>


        </Flex>
    


    
    </>)
}

export default ShiftCell;