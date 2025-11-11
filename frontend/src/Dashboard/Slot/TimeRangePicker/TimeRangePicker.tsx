import { Group, Text } from "@mantine/core"


import { getTimeRange, TimePicker } from "@mantine/dates"
import './TimeRangePicker.css'
import type { Shift } from "../../Interfaces/Shift"

import axios from "axios"

import { useContext } from "react"
import { EmployeeContext } from "../../views/EmployeeContext"



// interface TimeRangePickerProps{
//     shift?:Shift
//     employee: Employee
//     date:string
//     //setIsFocused:React.Dispatch<React.SetStateAction<boolean>>
// }


interface ShiftResponse{
    success:boolean
    row?: Shift
    error?:string
}
function TimeRangePicker(){
   
    const {employee,date,shift} = useContext(EmployeeContext)
 
    const morning = getTimeRange({startTime:'9:00',endTime: '11:30',interval:'00:30'})
    const afternoon = getTimeRange({startTime:'12:30:00',endTime: '18:00:00',interval:'00:30:00'})
   

  
    const onChange = async(time: string, slot: 'start' | 'end')=>{
        try{
            const response = await axios.post<ShiftResponse>(`http://localhost:3000/api/employee/${employee!.id}/shift`,
                    slot==='start' 
                    ?{
                        date:date?.date,
                        start_time: time,
                        end_time : null
                    }

                    :{
                        date:date?.date,
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
            <Group justify="center" flex={1} h={'100%'} bg={'red'} gap={0} bd={'1px solid black'} onClick={()=>{console.log('timepicker')}} >
                <TimePicker 
                    
                    classNames={{ input: 'david-class'}}
                    styles={{input:{backgroundColor:'transparent'}}}
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

                <Text  w={10} style={{textAlign:'center'}}>-</Text>

                <TimePicker 
                
                    classNames={{ input: 'david-class'}}
                    styles={{input:{backgroundColor:'transparent'}}}
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
