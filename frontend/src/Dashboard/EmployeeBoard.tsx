import { Box, Paper } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";


interface Employee{
    name: string
}

interface EmployeeResponse{
    employeeList: Employee[]
}


function EmployeeBoard(){
    const [employeeList,setEmployeeList] = useState<Employee[]>([])
    const testList = [
        {name:'David'},
        {name:'Erica'},
        {name:'Kaitlyn'},
        {name:'Minh Thu'},
        {name:'Erica'},

    ]
    useEffect(()=>{
        const fetchData= async()=>{
            const response = await axios.get<EmployeeResponse>('http://localhost:3000/api/employee/all');
            console.log(response.data.employeeList)
            setEmployeeList(response.data.employeeList)
        }
        fetchData()
    })


    return(
        <>
        <Box display={'flex'} style={{flexDirection:"column",minWidth:'12rem',gap:'1rem',padding:'0rem 1rem'}} >
            <Paper radius={0}>
                       Staff

                    </Paper>
            {testList.map((employee)=>{
                return (
                    <Paper radius={0}>
                       {employee.name}

                    </Paper>
                )
            })}
        </Box>
        </>
    )
}

export default EmployeeBoard;