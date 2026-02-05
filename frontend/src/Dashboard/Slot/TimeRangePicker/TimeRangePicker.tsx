import { Group, Text } from "@mantine/core"


import { getTimeRange, TimePicker } from "@mantine/dates"
import './TimeRangePicker.css'
import type { Shift } from "../../Interfaces/Shift"

import axios from "axios"
import { DateTime } from "luxon"
import { useContext } from "react"
import { GridNavigationContext } from "../../views/GridNavigation/GridNavigationContext"



interface ShiftResponse{
    success:boolean
    row?: Shift
    error?:string
}


function TimeRangePicker({shift}:{shift:Shift}){
   
    const {setTimeOpened} = useContext(GridNavigationContext)!
 
    const morning = getTimeRange({startTime:'9:00',endTime: '11:30',interval:'00:30'})
    const afternoon = ['12:00:00','13:00:00','13:30:00','14:30:00','15:00:00','17:00:00']
    

    const start_time = shift.start_time ?  DateTime.fromISO(shift.start_time).toFormat('HH:mm') : ''
    const end_time = shift.end_time ?  DateTime.fromISO(shift.end_time).toFormat('HH:mm') : ''




    const onChange = async(time: string, slot: 'start' | 'end')=>{
        console.log('time range time', time)
        const formattedDate = DateTime.fromISO(shift.date).toISODate();
       
        try{
            const response = await axios.patch<ShiftResponse>(`http://localhost:3000/api/v1/employees/${shift.employee_id}/shifts/${shift.id}`,
                    slot==='start' 
                    ?{
                        date:formattedDate,
                        start_time: time,
                    }

                    :{
                        date:formattedDate,
                        end_time: time
                    },
                    {withCredentials:true}
                
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
            <Group tabIndex={-1} justify="center" flex={1} h={'100%'} bg={'red'} gap={0} bd={'1px solid black'}  
                
                
                >
                <TimePicker data-interactive
                    
                    
                    classNames={{ input: 'david-class'}}
                    styles={{input:{backgroundColor:'transparent'}}}
                    value={start_time}
                  
                    
                    //onPointerDown={(e) => e.stopPropagation()}
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
                        onOpen() {
                            setTimeOpened(true)
                        },
                        onClose() {
                            setTimeOpened(false)
                        },
                    }}
                    maxDropdownContentHeight={200}
                />

                <Text  w={10} style={{textAlign:'center'}}>-</Text>

                <TimePicker 
                    
                    
                    classNames={{ input: 'david-class'}}
                    styles={{input:{backgroundColor:'transparent'}}}
                    value={end_time}
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
                        onOpen() {
                            setTimeOpened(true)
                        },
                        onClose() {
                            setTimeOpened(false)
                        },
                    }}
                    maxDropdownContentHeight={200}
                />

            </Group>
   
        </>)
    
}

export default TimeRangePicker
