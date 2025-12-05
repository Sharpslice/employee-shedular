import { Button, Menu } from "@mantine/core"

import axios from "axios"
import type { Employee } from "../Interfaces/Employee"
import type { Day } from "../Interfaces/Day"
import type { Override } from "../Interfaces/Override"


type response ={
    success:boolean;
    row: Override
}

function SlotMenuBtn({employee,date}:{employee:Employee,date:Day}){

  
    
    const createShift =async()=>{
        await axios.post(`http://localhost:3000/api/employee/shift/${employee.id}/shift`,{date:date.date})
        console.log('hey')
    }

    const createOverride = async()=>{
        try{
           const response=  await axios.post<response>(`http://localhost:3000/api/employee/override/${employee.id}/${date.date}`,
            {isAvailable:false}
        )
            if(response.data.success){
                console.log('created override',response.data.row)
                
            }
        }catch(err){
            console.error(err)
        }
        
        
    }

    const focusRef =(element:HTMLButtonElement)=>{
        if(element){
            
            element.focus()
        }
    }
    return(
    <>
        <Menu  withArrow>
            <Menu.Target >
                <Button ref={focusRef} className="menuBtn" bg={'grey'} flex={1}>
                    slot
                </Button>
            </Menu.Target>
            <Menu.Dropdown>

            <Menu.Item onClick={()=>{createShift()}}>
                Shift
            </Menu.Item>

            <Menu.Item onClick={()=>{}}>
                availability
            </Menu.Item>

            <Menu.Item onClick={()=>{createOverride()}}>
                override
            </Menu.Item>

            </Menu.Dropdown>
        </Menu>

    </>
    )
}

export default SlotMenuBtn