
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
import type { ScheduleCell } from "./Interfaces/ScheduleCell";




interface dateRange{
    day:Day[]
}
interface schedule{
    id:number,
    date:string,
    shifts:Shift[]
    time_blocks:TimeBlock[]
    overrides:Override[]
    override_time_block:OvTimeBlock[]
}

type scheduleResponse = {
    schedule: schedule[]
    dateRange: Day[]
}


function Dashboard(){   
    const {date} = useParams();
    
    
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
        const res = await axios.get(`http://localhost:3000/api/v1/employees/schedule-overview/${safeView}/${safeDate}`, { withCredentials: true })
        
        return res.data 
    }
    const {data } = useQuery<scheduleResponse>({queryKey: ['schedule',safeDate,safeView],queryFn:fetchCalendar});
   
    const setGrid = useScheduleStore(state=>state.setGrid)
    const setDateRange = useScheduleStore(state=>state.setDateRange)
    const scheduleGrid = useScheduleStore(state=>state.scheduleGrid)
    const dateRange = useScheduleStore(state=>state.dateRange)
    useEffect(()=>{
        const schedule = data?.schedule
        const dateRange = data?.dateRange
        if(!schedule) return
        const gridMap = new Map<number,Map<string,ScheduleCell |null >>()
        for(const row of schedule){
            console.log(row.id)

            const scheduleCell = {
                shifts: row.shifts,
                overrides:row.overrides,
                time_blocks:row.time_blocks,
                ov_time_blocks:row.override_time_block
            }

            if(!gridMap.has(row.id)){
                
                const innerMap = new Map()
                innerMap.set(row.date,scheduleCell)
                gridMap.set(row.id, innerMap)
            }
            if(gridMap.has(row.id) && !gridMap.get(row.id)?.has(row.date)){
                gridMap.get(row.id)?.set(row.date,null)
            }

            gridMap.get(row.id)?.set(row.date,scheduleCell)

        }
        setGrid(gridMap)

        if(!dateRange) return
        setDateRange(dateRange)
        

    },[data])
    console.log(scheduleGrid)
    console.log(dateRange)
  
    // useEffect(() => {
    //     console.log('fetching new date: ', safeDate)
    //     const fetchData = async () => {
    //         try {
                
    //             const [calendarResponse, employeeResponse] = await Promise.all([
    //                 axios.get<CalendarResponse>(`http://localhost:3000/api/calendar/date?date=${safeDate}&view=${safeView}`, { withCredentials: true }),
    //                 axios.get<EmployeeResponse>(`http://localhost:3000/api/v1/employees/schedule-overview/${safeView}/${safeDate}`, { withCredentials: true })
    //             ]);

                
    //             setDateRange(calendarResponse.data.dateArray);
    //             //console.log('DateRange', calendarResponse.data.dateArray);
    //             //console.log(employeeResponse.data.overrides)
    //             setEmployeeList(EmployeeArrayToMap(employeeResponse.data.employeeList));
    //             setShifts(ShiftArrayToMap(employeeResponse.data.shifts));
    //             setAvailabilities(AvailabilityArrayToMap(employeeResponse.data.availabilities));
    //             setAv_time_blocks(TimeBlockArrayToMap(employeeResponse.data.av_time_blocks));
    //             setOverrides(OverrideToMap(employeeResponse.data.overrides));
    //             setOv_time_blocks(TimeBlockArrayToMap(employeeResponse.data.ov_time_blocks))

    //             //console.log("employee", EmployeeArrayToMap(employeeResponse.data.employeeList));
    //             // console.log("shifts", ShiftArrayToMap(employeeResponse.data.shifts));
    //             // console.log("availabilities", AvailabilityArrayToMap(employeeResponse.data.availabilities));
    //             // console.log("timeblock", TimeBlockArrayToMap(employeeResponse.data.av_time_blocks));
    //             // console.log("ov timeblock", TimeBlockArrayToMap(employeeResponse.data.ov_time_blocks));
    //             // console.log('overrides',OverrideToMap(employeeResponse.data.overrides))

    //         } catch (err) {
    //             console.error("Failed to fetch data:", err);
    //         }
    //     };

    //     fetchData();
    // }, [safeDate, safeView]);

    // useEffect(()=>{
    //     const handleUndoPress=(e:KeyboardEvent)=>{
    //         if(e.key==='z' && (e.ctrlKey || e.metaKey) ){
    //             e.preventDefault()
    //             console.log('undo press')
    //         }
    //     }
    //     window.addEventListener('keydown',(e:KeyboardEvent)=>handleUndoPress(e))

    //     return () => {
    //         window.removeEventListener('keydown', (e:KeyboardEvent)=>handleUndoPress(e));
    //     };


    // },[])



    return(
        <>  
        

        
            <Header view={safeView} selectedDate={safeDate} />
            <ContextMenuProvider>
                
                <ContextMenu/>
                    <Container  fluid p={'1rem 1rem'} w={'100%'} mih={'100%'} style={{display:'flex',justifyContent:'center'}}>

                        {   
                            <Outlet context={
                                {   safeView,
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