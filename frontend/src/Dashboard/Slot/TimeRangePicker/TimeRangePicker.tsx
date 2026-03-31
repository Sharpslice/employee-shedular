import { Group, Text } from "@mantine/core"


import { getTimeRange, TimePicker } from "@mantine/dates"
import './TimeRangePicker.css'
import type { Shift } from "../../Interfaces/Shift"

import { DateTime} from "luxon"
import { useContext, useRef, useState } from "react"
import { GridNavigationContext } from "../../views/GridNavigation/GridNavigationContext"
import type { TimeBlock } from "../../Interfaces/TimeBlock"
import type { OvTimeBlock } from "../../Interfaces/OvTimeBlock"



// interface ShiftResponse{
//     success:boolean
//     row?: Shift
//     error?:string
// }

interface PickerProps{
    data:TimeBlock | OvTimeBlock | Shift | null
    onChange: (time:string, slot: "start" | "end")=> Promise<void>
}

function TimeRangePicker({data,onChange}:PickerProps){
   
    const {setTimeOpened} = useContext(GridNavigationContext)!

    console.log(data?.start_time)
    const morning = getTimeRange({startTime:'9:00',endTime: '11:30',interval:'00:30'})
    const afternoon = ['12:00:00','13:00:00','13:30:00','14:30:00','15:00:00','17:00:00']

    const start_time = data?.start_time ?  DateTime.fromISO(data.start_time).toFormat('HH:mm') : ''
    const end_time = data?.end_time ?  DateTime.fromISO(data.end_time).toFormat('HH:mm') : ''
    const [userTyping,setUserTyping] = useState(false)

   
        
    
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
        //updateShiftTime(time,slot)
        onChange(time,slot)
        
        console.log('blur fired')

            
    }

    return (<>
            <Group tabIndex={-1} justify="center" flex={1} h={'100%'}  gap={0} bd={'1px solid black'}  
                >
                <TimePicker data-interactive size="sm"
                    
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
                        onChange(e,'start')
                        console.log('onchange firing')
                        
                    }}
                    onInput={()=>{setUserTyping(true)}}
                    onKeyDown={(e)=>{
                        e.stopPropagation()
                    }}      
                    format="12h"
                    withDropdown
                    presets={[
                        {label:'Morning',values:morning},
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

                <TimePicker size="sm"
                    
                    hoursRef={endHoursRef}
                    minutesRef={endMinutesRef}
                    amPmRef={endAmPmRef}
                    classNames={{ input: 'david-class'}}
                    styles={{input:{backgroundColor:'transparent'}}}
                    value={end_time}
                    onBlur={()=>{
                        handleBlur('end')
                    }}
                    onChange={(e)=>{onChange(e,'end')}}
                    onInput={()=>{setUserTyping(true)}}
                    format="12h"
                    withDropdown
                    presets={[
                        {label:'Morning',values:morning},
                        {label:'Afternoon', values:afternoon}
                    ]}
                    popoverProps={{
                        width: 300, 
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
