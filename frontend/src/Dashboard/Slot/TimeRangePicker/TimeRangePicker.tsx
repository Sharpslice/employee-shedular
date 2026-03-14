import { Group, Text } from "@mantine/core"


import { getTimeRange, TimePicker } from "@mantine/dates"
import './TimeRangePicker.css'
import type { Shift } from "../../Interfaces/Shift"

import axios from "axios"
import { DateTime} from "luxon"
import { useContext, useRef, useState } from "react"
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

    
    const [userTyping,setUserTyping] = useState(false)

    const updateShiftTime = async(time: string, slot: 'start' | 'end')=>{
        //console.log(time)
        
        const formattedDate = DateTime.fromISO(shift.date,{zone:'utc'}).toISODate();
   
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
            
          
        
        }catch(error:unknown){
            if(error instanceof Error){
                console.error(error.message)
            }
        }
    
    }
    
    const startHoursRef= useRef<HTMLInputElement>(null);
    const startMinutesRef = useRef<HTMLInputElement>(null);
    const startAmPmRef = useRef<HTMLSelectElement>(null);
    const endHoursRef = useRef<HTMLInputElement>(null);
    const endMinutesRef = useRef<HTMLInputElement>(null);
    const endAmPmRef = useRef<HTMLSelectElement>(null)

    const handleBlur = (slot: 'start' | 'end')=>{
        console.log(userTyping)
        if(!userTyping) return
        else setUserTyping(false)

        let hour = Number(slot==='start' ? startHoursRef.current?.value : endHoursRef.current?.value)
        const minute =Number(slot==='start'? startMinutesRef.current?.value : endMinutesRef.current?.value)
        const amPm = (slot==='start' ? startAmPmRef.current?.value : endAmPmRef.current?.value)
        
        if(amPm === 'AM' || amPm ==='PM')
            {
                console.log('has amPM, do not auto complete: ',amPm )
                return
            } 


        if(!hour) return
        if(hour < 7){
            hour+=12
        }

        const dt = DateTime.fromObject({hour:hour,minute:minute})
        const time = dt.toFormat('HH:mm:ss')
        console.log('autocomplete time: ',time)
        updateShiftTime(time,slot)
        
        console.log('blur fired')

            
    }

    return (<>
            <Group tabIndex={-1} justify="center" flex={1} h={'100%'} bg={'red'} gap={0} bd={'1px solid black'}  
                
                
                >
                <TimePicker data-interactive
                    
                    hoursRef={startHoursRef}
                    minutesRef={startMinutesRef}
                    amPmRef={startAmPmRef}
                    classNames={{ input: 'david-class'}}
                    styles={{input:{backgroundColor:'transparent'}}}
                    value={start_time}
                    onBlur={()=>{
                        handleBlur('start')
                    }}
                    onChange={(e)=>{
                       
                        console.log('onchange firing')
                        updateShiftTime(e,'start')}
                    }
                    onInput={()=>{setUserTyping(true)}}
                    onKeyDown={(e)=>{
                        e.stopPropagation()
                    }}      
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
                    
                    hoursRef={endHoursRef}
                    minutesRef={endMinutesRef}
                    amPmRef={endAmPmRef}
                    classNames={{ input: 'david-class'}}
                    styles={{input:{backgroundColor:'transparent'}}}
                    value={end_time}
                    onBlur={()=>{
                        handleBlur('end')
                    }}
                    onChange={(e)=>{updateShiftTime(e,"end")}}
                    onInput={()=>{setUserTyping(true)}}
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
