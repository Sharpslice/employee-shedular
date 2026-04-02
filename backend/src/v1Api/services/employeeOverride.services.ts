import {Request,Response} from 'express'
import prisma from '../../../db/db'

export async function createLeaveService(employee_id:number,date:string){

    const override = await prisma.employee_Time_Override.create({
        data:{
            employee_id:employee_id,
            date:date,
            type:"MISC",
            status:'APPROVED'
        }
    })


    return override


}

export async function createAvailabilityService(
    employee_id:number,date:string,
    start_time:string,end_time:string,
    

){
    const response = await prisma.$transaction(async (tx) => {


      

    });

    return response
}