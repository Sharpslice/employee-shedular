import { Box, deepMerge, Flex,Text } from "@mantine/core"

import { useOutletContext } from "react-router-dom"
import type { Shift } from "../Interfaces/Shift"
import type { Employee } from "../Interfaces/Employee"
import { DateTime } from "luxon"
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

function DayView(){
    const { dateRange,shifts,employeeList } = useOutletContext<{ dateRange: DayElement[],shifts:Map<number,Shift[]>, employeeList:Employee[] }>();
    
    const workHours = ['09:00:00', '10:00:00','11:00:00', '12:00:00' ,'13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00']
    console.log(shifts)

    const convertTo12hr = (time:string | null)=>{
        if(!time) return ""
        const dt = DateTime.fromFormat(time,'HH:mm:ss');
        return dt.toFormat('h a')
    }
    return(
    <>
    <Flex  direction={'column'} w={'100%'} h={'100%'}>

        <Box  display={'grid'} w={'100%'} style={{gridTemplateColumns:'repeat(9,1fr)'} }>
            {workHours.map((time)=>{
                return (
                    <Box key={time} style={{borderRight:'1px solid black'}}>{convertTo12hr(time)}</Box>
            
                )
            })}

        </Box>    

        <Flex  direction={'column'} flex={1} bg={'green'}>
            {employeeList.map((employee)=>{

                const shift = shifts.get(employee.id)?.find((curr)=> curr.date == dateRange[0].date)
                let startTime:number;
                
                if(shift){
                    console.log(typeof shift.start_time)
                    startTime = timeToDecimalHour(shift.start_time);
                    
                    
                    

                }
            

                return(
                    shift 
                    ?   <Flex pos={'relative'} bg={'blue'} 
                            left={`${((startTime!-9)/9)*100}%`} 
                            
                        >


                            <Text>{shift.start_time}</Text>
                            <Text>-</Text>
                            <Text>{shift.end_time}</Text>
                        </Flex> 

                    : null


                )
            })}
            
            </Flex>
    </Flex>
        
            





    </>
    )
}

export default DayView;