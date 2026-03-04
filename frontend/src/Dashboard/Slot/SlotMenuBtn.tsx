import { Button, Menu } from "@mantine/core"

import axios from "axios"
import type { Employee } from "../Interfaces/Employee"
import type { Day } from "../Interfaces/Day"
import type { Override } from "../Interfaces/Override"
import { useContext, useEffect, useRef } from "react"
import { GridNavigationContext } from "../views/GridNavigation/GridNavigationContext"


type response ={
    success:boolean;
    override: Override
}

function SlotMenuBtn({employee,date}:{employee:Employee,date:Day}){

    const {menuOpened,setMenuOpened} = useContext(GridNavigationContext)!;
    
    const createShift =async()=>{
        console.log(date.date)
        await axios.post(`http://localhost:3000/api/v1/employees/${employee.id}/shifts`,{date:date.date},{withCredentials:true})
    
    }

    const createOverride = async()=>{
        try{
           const response=  await axios.post<response>(`http://localhost:3000/api/v1/employees/${employee.id}/overrides/leaves`,
            {note:'test',date:date.date},{withCredentials:true}
        )
            if(response.data.success){
                console.log('created override',response.data.override)
                
            }
        }catch(err){
            console.error(err)
        }
        
        
    }
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
        <Menu opened={menuOpened}   onChange={setMenuOpened} withArrow>
            <Menu.Target  >
                <Button  ref={focusRef} className="menuBtn" bg={'grey'} flex={1}>
                    slot
                </Button>
            </Menu.Target>
            <Menu.Dropdown>

            <Menu.Item   className="menuBtnShift" onClick={()=>{createShift()}}>
                Shift
            </Menu.Item>

            <Menu.Item   className="menuBtnOverride" onClick={()=>{createOverride()}}>
                override
            </Menu.Item>

            </Menu.Dropdown>
        </Menu>

    </>
    )
}

export default SlotMenuBtn