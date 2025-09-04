import { Box, Paper } from "@mantine/core";
import axios from "axios";
import { useEffect} from "react";
import type { Employee } from "./Interfaces/Employee";



interface EmployeeResponse{
    employeeList: Employee[]
}
interface EmployeeBoardProps{
    employeeList: Employee[]
    setEmployeeList: React.Dispatch<React.SetStateAction<Employee[]>>
}

function EmployeeBoard({employeeList,setEmployeeList}:EmployeeBoardProps){
    


    useEffect(()=>{
        const fetchData= async()=>{
            const response = await axios.get<EmployeeResponse>('http://localhost:3000/api/employee/all');
            
            setEmployeeList(response.data.employeeList)
        }
        fetchData()
    },[])


    return(
        <>
        <Box display={'flex'} style={{flexDirection:"column",minWidth:'12rem',gap:'1rem',padding:'0rem 1rem'}} >
            <Paper radius={0}>
                       Staff

                    </Paper>
            {employeeList.map((employee)=>{
                return (
                    <Paper key ={employee.name}radius={0}>
                       {employee.name}

                    </Paper>
                )
            })}
        </Box>
        </>
    )
}

export default EmployeeBoard;