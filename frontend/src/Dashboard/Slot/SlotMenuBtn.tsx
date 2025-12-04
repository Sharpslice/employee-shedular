import { Button, Menu } from "@mantine/core"

import axios from "axios"
import type { Employee } from "../Interfaces/Employee"
import type { Day } from "../Interfaces/Day"


function SlotMenuBtn({employee,date}:{employee:Employee,date:Day}){

  
    
    const createShift =async()=>{
        await axios.post(`http://localhost:3000/api/employee/shift/${employee.id}/shift`,{date:date.date})
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

            <Menu.Item onClick={()=>{console.log('availability')}}>
                availability
            </Menu.Item>

            <Menu.Item>
                override
            </Menu.Item>

            </Menu.Dropdown>
        </Menu>

    </>
    )
}

export default SlotMenuBtn