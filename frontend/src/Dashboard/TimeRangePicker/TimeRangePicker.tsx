import { Box, Group, Text } from "@mantine/core"


import { useEffect, useState } from "react"
import { getTimeRange, TimePicker } from "@mantine/dates"
import './TimeRangePicker.css'
import type { Shift } from "../Interfaces/Shift"


interface TimeRangePickerProps{
    shift?:Shift
}

function TimeRangePicker({shift}:TimeRangePickerProps){
   

 
    const morning = getTimeRange({startTime:'9:00',endTime: '11:30',interval:'00:30'})
    const [startTime,setStartTime] = useState<string>(shift?.start_time ?? '' )
    const [endTime,setEndTime] = useState<string>(shift?.end_time?? '')

    useEffect(() => {
        setStartTime(shift?.start_time ?? '');
        setEndTime(shift?.end_time ?? '');
    }, [shift]);

    return (
        <>
       
                     <Group className="TimeRangePicker" gap={"sm"}  style={{justifyContent:'center'}} >
                        <TimePicker
                            classNames={{ input: 'david-class'}}
                            style={{width:'max-content'}}
                            value={startTime}
                            onChange={(e)=>{setStartTime(e)}}
                            withDropdown
                            format="12h"
                            presets={[
                                {label:'morning',values:morning},
                                {label:'Afternoon', values:getTimeRange({startTime:'12:30:00',endTime: '18:00:00',interval:'00:30:00'}) }
                            ]}
                            min="10:00"
                            popoverProps={{
                                width: 300, // match your Group width
                            position: 'bottom',
                            withArrow:true,
                            middlewares: { flip: true },
                            }}
                             maxDropdownContentHeight={150}
                            
                            
                        />
                        <Box h={'100%'}> <Text>-</Text> </Box>
                        <TimePicker
                            classNames={{ input: 'david-class'}}
                            style={{width:'max-content'}}
                        
                            withDropdown
                            value={endTime}
                            onChange={(e)=>{setEndTime(e)}}
                            format="12h"
                            presets={[
                                {label:'morning',values:morning},
                                {label:'Afternoon', values:getTimeRange({startTime:'12:30:00',endTime: '18:00:00',interval:'00:30:00'}) }
                            ]}
                            popoverProps={{
                                width: 300, // match your Group width
                            position: 'bottom',
                            withArrow:true,
                            middlewares: { flip: true },
                            }}
                             maxDropdownContentHeight={150}

                        />
                    </Group>

        
            
            

 

          
            
           

        
            
        </>
    )
    
}

export default TimeRangePicker
