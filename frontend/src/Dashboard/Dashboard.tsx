
import {  useEffect, useState } from "react"

import axios from "axios";
import Header from "./Header";
import { Container, } from "@mantine/core";
import { Outlet, useMatch, useParams } from "react-router-dom";

import type { Employee } from "./Interfaces/Employee";
import type { Day } from "./Interfaces/Day";



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

import {DateTime} from 'luxon';
import type { Weekly_Time_block } from "./Interfaces/weekly_time_block";


type schedule={
    id:number,
    date:string,
    shifts:Shift[]
    availability_time_blocks:TimeBlock[]
    overrides:Override[]
    override_time_blocks:OvTimeBlock[]
    availability_weekly_time_blocks:Weekly_Time_block[]
}

type scheduleResponse = {
    dates: Day[]
    schedule: schedule[]
    employees: Employee[]
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
    
    useScheduleSocket();

    const fetchCalendar=async()=>{
        const res = await axios.get<scheduleResponse>(`http://localhost:3000/api/v1/employees/schedule-overview/${safeView}/${safeDate}`, { withCredentials: true })
        return res.data 
    }
    const {data } = useQuery<scheduleResponse>({queryKey: ['schedule',safeDate,safeView],queryFn:fetchCalendar, staleTime: 0});
   
    const setGrid = useScheduleStore(state=>state.setGrid)
    const setDateRange = useScheduleStore(state=>state.setDateRange)
    const setEmployees = useScheduleStore(state=>state.setEmployees)
    // const employees = useScheduleStore(state=>state.employees)
     const scheduleGrid = useScheduleStore(state=>state.scheduleGrid)
    // const dateRange = useScheduleStore(state=>state.dateRange)

    
    useEffect(()=>{

        const schedule = data?.schedule
        const dateRange = data?.dates
        const employees = data?.employees
        if(!schedule) return
        console.log(schedule)
        const gridMap = new Map<number,Map<string,ScheduleCell |null >>()
        for(const row of schedule){
            const date = DateTime.fromISO(row.date,{ zone: 'utc' }).toISODate()!

            const scheduleCell = {
                shifts: row.shifts,
                overrides:row.overrides,
                availability_time_blocks:row.availability_time_blocks ,
                override_time_blocks:row.override_time_blocks,
                availability_weekly_time_blocks:row.availability_weekly_time_blocks
            }

            if(!gridMap.has(row.id)){
                
                const innerMap = new Map()
                innerMap.set(date,scheduleCell)
                gridMap.set(row.id, innerMap)
            }
            if(gridMap.has(row.id) && !gridMap.get(row.id)?.has(date)){
                gridMap.get(row.id)?.set(date,null)
            }

            gridMap.get(row.id)?.set(date,scheduleCell)

        }
        setGrid(gridMap)
        

        if(!dateRange) return
        
            const normalizedDates = dateRange.map(day => ({
                ...day,
                date: DateTime.fromISO(day.date,{ zone: 'utc' }).toISODate()!
            }))
        setDateRange(normalizedDates)





        setDateRange(normalizedDates)
        console.log(dateRange)

        if(!employees) return
        setEmployees(employees)
        


        
       
    
    },[data])
     console.log(scheduleGrid)
    
  
   



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