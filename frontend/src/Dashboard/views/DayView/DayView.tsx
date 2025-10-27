import {  Divider, Flex,Text } from "@mantine/core"

import { useOutletContext } from "react-router-dom"
import type { Shift } from "../../Interfaces/Shift"
import type { Employee } from "../../Interfaces/Employee"
import { DateTime } from "luxon"
import EmployeeRow from "../EmployeeRow/EmployeeRow"
import ViewHeader from "../WeekView/View-header"
type DayElement ={
    week:number,
    date: string,
    days_of_week:number,
    day_of_month:number
    month: number
}


function timeToDecimalHour(time:string){
    const dt = DateTime.fromFormat(time,'HH:mm:ss');
    const decimalHour = (dt.hour * 60 + dt.minute) /60
   
    return decimalHour;
}
const convertTo12hr = (time:string | null)=>{
        if(!time) return ""
        const dt = DateTime.fromFormat(time,'HH:mm:ss');
        return dt.toFormat('h a')
    }
const convertTo12hrMin = (time:string | null)=>{
    if(!time) return ""
        const dt = DateTime.fromFormat(time,'HH:mm:ss');
        return dt.toFormat('h:mm a')
}
function DayView(){
    const { dateRange,employeeList } = useOutletContext<{ dateRange: DayElement[],shifts:Map<number,Shift[]>, employeeList:Employee[] }>();
    
    const workHours = ['09:00:00', '10:00:00','11:00:00', '12:00:00' ,'13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00']
    

    
    return(
    <>
    <Flex gap={5} direction={'column'} >
        
        <ViewHeader>
            {workHours.map((time)=>{
                    return (
                        <>
                            <Flex  key={time} flex={1} style={{padding:5}} >
                                {convertTo12hr(time)}
                            </Flex>
                            <Divider orientation="vertical" color="black" 
                            />
                        </>
                    )
                })}
        </ViewHeader>
        
        <Flex  direction={'column'} gap={10} flex={1} >
            {employeeList.map((employee)=>{

                const todayShift = employee.shifts.find((shift)=> shift.date === dateRange[0].date)
                let startTime:number;
                let endTime:number;
                if(todayShift){
                    startTime = timeToDecimalHour(todayShift.start_time)
                    endTime = timeToDecimalHour(todayShift.end_time)
                }
                
                return(
                    todayShift ? 
                        <EmployeeRow  employee={employee} dateRange={dateRange}>
                            <Flex flex={1} bg={'blue'} bd={'1px solid black'} pos={'relative'} left={`${((startTime!-9)/9)*100}%`} w={`${((endTime!-startTime!)/9)*100}%`}
                            style={{padding:10}}
                            
                            >
                                <Text>
                                    {`${convertTo12hrMin(todayShift.start_time)} - ${convertTo12hrMin(todayShift.end_time)}`}
                                </Text>
                                
                            </Flex>
                        </EmployeeRow>

                    :null
                )
            })}
            
            </Flex>
    </Flex>
        
            





    </>
    )
}

export default DayView;