
import {  useEffect, useState } from "react"
import {DateTime} from 'luxon'
import axios from "axios";
import Header from "./Header";
import { Container} from "@mantine/core";
import { Outlet, useMatch, useParams } from "react-router-dom";

import type { Employee } from "./Interfaces/Employee";
import type { Day } from "./Interfaces/Day";

import { AvailabilityArrayToMap, EmployeeArrayToMap,OverrideToMap,ShiftArrayToMap, TimeBlockArrayToMap } from "./views/ArrayToMap";

import { ContextMenuProvider } from "./Slot/ContextMenu/ContextMenuProvider";
import ContextMenu from "./Slot/ContextMenu/ContextMenu";
import useScheduleSocket from "./useScheduleSocket";
import type { Shift } from "./Interfaces/Shift";
import type { Availability } from "./Interfaces/Availability";
import type { TimeBlock } from "./Interfaces/TimeBlock";
import type { Override } from "./Interfaces/Override";
import type { OvTimeBlock } from "./Interfaces/OvTimeBlock";
import { useQuery } from "@tanstack/react-query";
import { useScheduleStore } from "../scheduleStore";




type CalendarResponse ={
    dateArray: Day[]
}
interface EmployeeResponse{
    employeeList: Employee[]
    shifts: Shift[]
    availabilities: Availability[]
    av_time_blocks: TimeBlock[]
    overrides: Override[]
    ov_time_blocks: TimeBlock[]
}


function Dashboard(){   
    const {date} = useParams();
    const [dateRange,setDateRange] = useState<Day[]>([]) 

    
    const isWeek = useMatch('schedule/week/*')
    const isDay = useMatch('schedule/day/*')
    const isMonth = useMatch('schedule/month/*')
    const isCalendar = useMatch('schedule/calendar/*')
    const safeView = isWeek ? 'week' : isDay ? 'day' : isMonth ? 'month' : isCalendar ? 'month' : 'week'
    const safeDate = date ?? DateTime.local().toISODate()
    
  
    const [employeeList,setEmployeeList] = useState<Map<number,Employee>>(new Map())
    const [shifts,setShifts] = useState<Map<number,Shift>>(new Map())
    const [availabilities,setAvailabilities] = useState<Map<number,Availability>>(new Map())
    const [av_time_blocks,setAv_time_blocks] = useState<Map<number,TimeBlock>>(new Map())
    const [overrides,setOverrides] = useState<Map<number,Override>>(new Map())
    const [ov_time_blocks,setOv_time_blocks] = useState<Map<number,OvTimeBlock>>(new Map())
    
    useScheduleSocket(setShifts,setOverrides,setOv_time_blocks);

    const fetchCalendar=async()=>{
        const res = await axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/date?date=${safeDate}&view=${safeView}`, { withCredentials: true })
        return res.data.dateArray
    }
    const info = useQuery({queryKey: ['calendar',safeDate,safeView],queryFn:fetchCalendar});
    console.log(info)


    const setCell = useScheduleStore(state => state.setCell)

useEffect(() => {
    setCell(1, '2026-03-23', {
        shifts: [],
        overrides: [],
        time_blocks: [],
        ov_time_blocks: []
    })
}, [])

const testCell = useScheduleStore(state => state.scheduleGrid.get(1)?.get('2026-03-23'))
console.log('testCell:', testCell)



    useEffect(() => {
        console.log('fetching new date: ', safeDate)
        const fetchData = async () => {
            try {
                
                const [calendarResponse, employeeResponse] = await Promise.all([
                    axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/date?date=${safeDate}&view=${safeView}`, { withCredentials: true }),
                    axios.get<EmployeeResponse>(`http://localhost:3000/api/v1/employees/schedule-overview/${safeView}/${safeDate}`, { withCredentials: true })
                ]);

                
                setDateRange(calendarResponse.data.dateArray);
                console.log('DateRange', calendarResponse.data.dateArray);
                console.log(employeeResponse.data.overrides)
                setEmployeeList(EmployeeArrayToMap(employeeResponse.data.employeeList));
                setShifts(ShiftArrayToMap(employeeResponse.data.shifts));
                setAvailabilities(AvailabilityArrayToMap(employeeResponse.data.availabilities));
                setAv_time_blocks(TimeBlockArrayToMap(employeeResponse.data.av_time_blocks));
                setOverrides(OverrideToMap(employeeResponse.data.overrides));
                setOv_time_blocks(TimeBlockArrayToMap(employeeResponse.data.ov_time_blocks))

                console.log("employee", EmployeeArrayToMap(employeeResponse.data.employeeList));
                // console.log("shifts", ShiftArrayToMap(employeeResponse.data.shifts));
                // console.log("availabilities", AvailabilityArrayToMap(employeeResponse.data.availabilities));
                // console.log("timeblock", TimeBlockArrayToMap(employeeResponse.data.av_time_blocks));
                // console.log("ov timeblock", TimeBlockArrayToMap(employeeResponse.data.ov_time_blocks));
                // console.log('overrides',OverrideToMap(employeeResponse.data.overrides))

            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };

        fetchData();
    }, [safeDate, safeView]);

    useEffect(()=>{
        const handleUndoPress=(e:KeyboardEvent)=>{
            if(e.key==='z' && (e.ctrlKey || e.metaKey) ){
                e.preventDefault()
                console.log('undo press')
            }
        }
        window.addEventListener('keydown',(e:KeyboardEvent)=>handleUndoPress(e))

        return () => {
            window.removeEventListener('keydown', (e:KeyboardEvent)=>handleUndoPress(e));
        };


    },[])



    return(
        <>  
        

        
            <Header view={safeView} selectedDate={safeDate} />
            <ContextMenuProvider>
                
                <ContextMenu/>
                    <Container  fluid p={'1rem 1rem'} w={'100%'} mih={'100%'} style={{display:'flex',justifyContent:'center'}}>

                        {   
                            <Outlet context={
                                {   safeView,dateRange,
                                    employeeList,setEmployeeList,
                                    shifts,setShifts, 
                                    availabilities,setAvailabilities,
                                    av_time_blocks,setAv_time_blocks,
                                    overrides,setOverrides,
                                    ov_time_blocks,setOv_time_blocks

                                }
                            }/>
                        }
                    
                    </Container> 
            </ContextMenuProvider>
            





        </>
    )
}

export default Dashboard