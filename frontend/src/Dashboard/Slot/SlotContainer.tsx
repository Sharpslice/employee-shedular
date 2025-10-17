import React from "react"


interface SlotContainerProps{
    children: React.ReactNode
}
function SlotContainer({children}:SlotContainerProps){
    const ChildrenArray = React.Children.toArray(children).filter(Boolean)
    return(
        <>
            {ChildrenArray.map((children)=>{     
                return(children)
            })
            }
        </>
    )
}

export default SlotContainer