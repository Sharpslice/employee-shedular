import { Box, Button,Flex } from "@mantine/core"
import React from "react"
import SlotMenu from "./SlotMenu"


interface SlotContainerProps{
    coords?: {row:number, col:number}
    focusedId?: {row:number,col:number}
    children?: React.ReactNode
}
function SlotContainer({coords,focusedId,children}:SlotContainerProps){
    const childrenArray = React.Children.toArray(children)
    console.log(coords)
    if(focusedId?.row === coords?.row && focusedId?.col===coords?.col) return <SlotMenu/>
    return(
        <>
           <Flex flex={1} bg={'blue'} align={'center'} justify={"center"} >slot</Flex>
        </>
    )
}

export default SlotContainer