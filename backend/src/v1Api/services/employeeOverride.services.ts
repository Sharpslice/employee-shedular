import {Request,Response} from 'express'
import prisma from '../../../db/db'

export async function createLeaveService(employee_id:number,date:string){

    const override = await prisma.employee_Time_Override.create({
        data:{
            employee_id:employee_id,
            date:date,
            is_available:false
        }
    })


    return override


}