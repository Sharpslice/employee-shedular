import { Paper } from "@mantine/core";


interface TimeCellProps{
    time:string
    startTime:any
    endTime:any
    setStartTime:any
    setEndTime:any
    first:any
    second:any
    setFirst:any
    setSecond:any
}
function TimeCell({time,startTime,endTime,setStartTime,setEndTime,first,second,setFirst,setSecond}:TimeCellProps){



    const onHandleClick = () =>{
      
        
           
        
        
    }

    return(
    <>
        <Paper onClick={onHandleClick} bg={
        startTime === time
            ? 'blue'
            : endTime === time
            ? 'red'
            : 'white'
            } >
            {time}
        </Paper>




    </>
    )
}

export default TimeCell;