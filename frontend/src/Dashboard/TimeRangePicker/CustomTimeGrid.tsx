import { SimpleGrid } from "@mantine/core"
import { getTimeRange } from "@mantine/dates"
import TimeCell from "./TimeCell"
import { useState } from "react"



interface CustomTimerGridProps{
    startTime:any
    endTime:any
    setStartTime:any
    setEndTime:any
}

function CustomTimeGrid({startTime,endTime,setStartTime,setEndTime}:CustomTimerGridProps){


    const morning = getTimeRange({startTime:'9:00',endTime: '13:00',interval:'00:30'})

    const [first,setFirst] = useState('')
    const [second,setSecond] = useState('')
   



    return(<>
        <SimpleGrid cols={3}>
            {morning.map((time)=>{
                return(
                    <TimeCell key={time} 
                        time={time}
                        startTime={startTime}
                        endTime={endTime}
                        setStartTime={setStartTime}
                        setEndTime={setEndTime}
                        first={first}
                        second={second}
                        setFirst={setFirst}
                        setSecond={setSecond}
                    />
                )
            })}


        </SimpleGrid>
    </>)
}

export default CustomTimeGrid