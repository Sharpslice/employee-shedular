import { Box, Button,Flex } from "@mantine/core"
import React from "react"
import SlotMenu from "./SlotMenu"
import SlotPlaceholder from "./SlotPlaceholder"


interface SlotContainerProps{
    coords?: {row:number, col:number}
    focusedId?: {row:number,col:number}
    children?: React.ReactNode
}
function SlotContainer({coords,focusedId,children}:SlotContainerProps){
    const childrenArray = React.Children.toArray(children)
    console.log(childrenArray)
    if((focusedId?.row === coords?.row && focusedId?.col===coords?.col) && childrenArray.length ===0) return <SlotMenu/>
    if(childrenArray.length === 0) return <SlotPlaceholder/>
    return(
        <>
           
        </>
    )
}

export default SlotContainer