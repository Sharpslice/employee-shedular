import { Box, Group, Text } from "@mantine/core"


import { getTimeRange, TimePicker } from "@mantine/dates"
import './TimeRangePicker.css'
import type { Shift } from "../../Interfaces/Shift"
import type React from "react"
import axios from "axios"
import type { Employee } from "../../Interfaces/Employee"



interface TimeRangePickerProps{
    shift?:Shift
    employee: Employee
    date:string
    setIsFocused:React.Dispatch<React.SetStateAction<boolean>>
}


interface ShiftResponse{
    success:boolean
    row?: Shift
    error?:string
}
function TimeRangePicker({setIsFocused, employee, date,shift}:TimeRangePickerProps){
   
    
 
    const morning = getTimeRange({startTime:'9:00',endTime: '11:30',interval:'00:30'})
    const afternoon = getTimeRange({startTime:'12:30:00',endTime: '18:00:00',interval:'00:30:00'})

  
    const onChange = async(time: string, slot: 'start' | 'end')=>{
        try{
            const response = await axios.post<ShiftResponse>
            (`http://localhost:3000/api/employee/${employee.id}/shift`,
                slot==='start' 
                ?{
                    date:date,
                    start_time: time,
                    end_time : null
                }

                :{
                    date:date,
                    start_time: null,
                    end_time: time
                }
            
            )
            if(response.data.success){
                console.log(response.data.row)
            }
            else{
                console.error(response.data.error)
            }
        
        }catch(error:unknown){
            if(error instanceof Error){
                console.error(error.message)
            }
        }




        
        
    
    }

    return (<>
            <Group tabIndex={1} className="TimeRangePicker" gap={"sm"}  style={{justifyContent:'center'}} >
                <TimePicker autoFocus
                    classNames={{ input: 'david-class'}}
                    style={{width:'max-content'}}
                    value={shift?.start_time}
                    onChange={(e)=>{onChange(e,"start")}}
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

                <TimePicker onBlur={()=>{setIsFocused(false)}}
                    classNames={{ input: 'david-class'}}
                    style={{width:'max-content'}}
                    value={shift?.end_time}
                    onChange={(e)=>{onChange(e,"end")}}
                    format="12h"
                    withDropdown
                    
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
