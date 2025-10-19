import React from "react"


interface SlotContainerProps{
    children?: React.ReactNode
}
function SlotContainer({children}:SlotContainerProps){
    
    return(
        <>
            {[children].map((child)=>{

                
                return(child)
            })}
        </>
    )
}

export default SlotContainer