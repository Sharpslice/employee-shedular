
import React from "react"
import SlotMenuBtn from "./SlotMenuBtn"
import SlotPlaceholder from "./SlotPlaceholder"


interface SlotContainerProps{
   
    coords?: {row:number, col:number}
    focusedId?: {row:number,col:number}
    children?: React.ReactNode
}
function SlotContainer({coords,focusedId,children}:SlotContainerProps){
    const childrenArray = React.Children.toArray(children)

    
    
    if((focusedId?.row === coords?.row && focusedId?.col===coords?.col) && childrenArray.length ===0){
        
        return <SlotMenuBtn/>
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