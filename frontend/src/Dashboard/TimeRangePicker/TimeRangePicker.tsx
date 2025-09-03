import { Box, Group,Input,Popover,Text } from "@mantine/core"

import CustomTimeGrid from "./CustomTimeGrid"
import { useEffect, useState } from "react"
import { TimeInput } from "@mantine/dates"
import './TimeRangePicker.css'
import type { Shift } from "../Interfaces/Shift"


interface TimeRangePickerProps{
    shift:Shift
}

function TimeRangePicker({shift}:TimeRangePickerProps){
   

    console.log(shift.employee_id)
    
    const [startTime,setStartTime] = useState<string>(shift.start_time)
    const [endTime,setEndTime] = useState<string>(shift.end_time)

     useEffect(()=>{
        console.log(startTime)
        console.log(endTime)
     },[startTime,endTime])
    return (
        <>
        <Popover>
            <Popover.Target>
                <Group className="TimeRangePicker" gap={"sm"}  style={{justifyContent:'center'}}>
                    <TimeInput
                        classNames={{ input: 'david-class'}}
                        style={{width:'max-content'}}
                        value={startTime}
                        onChange={(e)=>{setStartTime(e.target.value)}}
                        
                        
                    />
                    <Box h={'100%'}> <Text>-</Text> </Box>
                    <TimeInput
                        classNames={{ input: 'david-class'}}
                        style={{width:'max-content'}}
                        value={endTime}
                        onChange={(e)=>{setEndTime(e.target.value)}}
                    />
                </Group>
            </Popover.Target>

            <Popover.Dropdown>
                <CustomTimeGrid startTime={startTime} endTime={endTime}setStartTime={setStartTime} setEndTime={setEndTime}/>
            </Popover.Dropdown>
        </Popover>
            
            
            



        
            
            

 

          
            
           

        
            
        </>
    )
    
}

export default TimeRangePicker

{/* <TimePicker flex={1}
                format="12h"
                withDropdown
                popoverProps={{width:'target'}}
                presets={
                    [
                        {label:'Morning', values:getTimeRange({startTime:'9:00:00',endTime: '12:00:00',interval:'00:30:00'}) },
                        {label:'Afternoon', values:getTimeRange({startTime:'12:30:00',endTime: '18:00:00',interval:'00:30:00'}) }
                    ]
                    
                }
            /> */}