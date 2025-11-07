import { Button, Menu } from "@mantine/core"
import { useContext } from "react"
import { EmployeeContext } from "../views/EmployeeContext"
import axios from "axios"

function SlotMenu(){

    const employeeContext = useContext(EmployeeContext)
    
    const createShift =async()=>{
        await axios.post(`http://localhost:3000/api/employee/shift/${employeeContext.employee?.id}/shift`,{date:employeeContext.date?.date})
    }


    return(
    <>
        <Menu withArrow>
            <Menu.Target>
                <Button bg={'grey'} flex={1}>
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

export default SlotMenu