import { Button, Menu } from "@mantine/core"

import axios from "axios"
import type { Employee } from "../Interfaces/Employee"
import type { Day } from "../Interfaces/Day"
import type { Override } from "../Interfaces/Override"
import { useContext, useEffect, useRef } from "react"
import { GridNavigationContext } from "../views/GridNavigation/GridNavigationContext"
import { createShift } from "../../services/shiftServices"
import { createOverride } from "../../services/overrideServices"



function SlotMenuBtn({employee,date}:{employee:Employee,date:Day}){

    const {menuOpened,setMenuOpened} = useContext(GridNavigationContext)!;
    
   

    
    const focusRef= useRef<HTMLButtonElement>(null)

    useEffect(()=>{
        if(focusRef.current && !menuOpened){
            focusRef.current.focus()
        }
    },[menuOpened])

    // const focusRef =(element:HTMLButtonElement)=>{
    //     if(element ){
    //         element.focus()
    //     }
       
    // }
    
    return(
    <>
        <Menu 
            opened={menuOpened}   
            onChange={setMenuOpened} 
           
            withArrow
            
            
            
            >
            <Menu.Target  >
                <Button  ref={focusRef} className="menuBtn" bg={'grey'} flex={1}
                 
                
                >
                    slot
                </Button>
            </Menu.Target>
            <Menu.Dropdown>

            <Menu.Item   className="menuBtnShift" onClick={()=>{createShift(employee.id,date.date)}}>
                Shift
            </Menu.Item>

            <Menu.Item   className="menuBtnOverride" onClick={()=>{createOverride(employee.id,date.date)}}>
                override
            </Menu.Item>

            </Menu.Dropdown>
        </Menu>

    </>
    )
}

export default SlotMenuBtn