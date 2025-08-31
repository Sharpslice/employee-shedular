import express from 'express';
import prisma from '../../db/db'

const employee = express.Router();


employee.get('/all',async(req,res)=>{
    const employeeList = await prisma.employee.findMany({
        select:{
            name:true
        }


    })
    res.json({employeeList})
})

export default employee;

