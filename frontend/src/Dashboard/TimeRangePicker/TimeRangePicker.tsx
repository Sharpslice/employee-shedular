import { Box, Group, Text } from "@mantine/core"


import { getTimeRange, TimePicker } from "@mantine/dates"
import './TimeRangePicker.css'
import type { Shift } from "../Interfaces/Shift"



interface TimeRangePickerProps{
    shift?:Shift
    
}

function TimeRangePicker({shift}:TimeRangePickerProps){
   
    
 console.log('TimeRangePicker mounted', shift);
    const morning = getTimeRange({startTime:'9:00',endTime: '11:30',interval:'00:30'})
    const afternoon = getTimeRange({startTime:'12:30:00',endTime: '18:00:00',interval:'00:30:00'})

  


    return (<>
            <Group  className="TimeRangePicker" gap={"sm"}  style={{justifyContent:'center'}} >
                <TimePicker
                    classNames={{ input: 'david-class'}}
                    style={{width:'max-content'}}
                    value={shift?.start_time}
                    format="12h"
                    withDropdown
                    presets={[
                        {label:'morning',values:morning},
                        {label:'Afternoon', values:afternoon}
                    ]}
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
                    format="12h"
                    withDropdown
                    value={shift?.end_time}
                    presets={[
                        {label:'morning',values:morning},
                        {label:'Afternoon', values:afternoon }
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
   
        </>)
    
}

export default TimeRangePicker
