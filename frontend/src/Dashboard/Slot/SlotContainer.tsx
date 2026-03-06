
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
    const childrenCount = React.Children.count(children)
    const cellFocused = focusedId?.row === coords?.row && focusedId?.col===coords?.col
    console.log(childrenCount)
    if(childrenCount===0){
        return cellFocused ? <SlotMenuBtn employee={employee} date={date}/> : <SlotPlaceholder/>
    }

    return(
        <>
           {children}
        </>
    )
}

export default SlotContainer