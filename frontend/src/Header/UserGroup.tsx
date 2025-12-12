import { Avatar, Group, Menu } from "@mantine/core"
import { useContext } from "react"
import { AuthenticatedUser } from "../AuthenticatedUserContext"
import Login from "../login/login"



function UserGroup (){
    const user = useContext(AuthenticatedUser)
    return(
        <Group>
            {user?
                
                
                <Menu>
                <Menu.Target>
                    <Avatar variant="filled" src ={user?.picture} color={user?.color} radius={'xl'}/>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item onClick={()=>{
                        window.location.href = "http://localhost:3000/auth/google/logout";
                    }}>
                        Log Out
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            : <Login/>
        }
            
        </Group>
    )
}

export default UserGroup