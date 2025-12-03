
import React from "react"
import SlotMenuBtn from "./SlotMenuBtn"
import SlotPlaceholder from "./SlotPlaceholder"
import type { Employee } from "../Interfaces/Employee"
import type { Day } from "../Interfaces/Day"


interface SlotContainerProps{
   
    coords?: {row:number, col:number}
    focusedId?: {row:number,col:number}
    children?: React.ReactNode
    employee:Employee
    date: Day

}
function SlotContainer({coords,focusedId,children,employee,date}:SlotContainerProps){
    const childrenArray = React.Children.toArray(children)

    
    
    if((focusedId?.row === coords?.row && focusedId?.col===coords?.col) && childrenArray.length ===0){
        
        return <SlotMenuBtn employee={employee} date={date}/>
    } 
    
    if(childrenArray.length === 0) return <SlotPlaceholder/>
    return(
        <>
           {childrenArray.map((slot)=>{
                
                return(slot)
           })}
        </>
    )
}

export default SlotContainer