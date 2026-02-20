import { DateTime } from "luxon"
import prisma from "../../../db/db"



export async function scheduleService(beginDate:DateTime,endDate:DateTime){
    const employeeList = await prisma.employee.findMany({
        select:{
            id:true,
            name:true,
            isWorking:true,
            position:true,
            },
        })


    const shifts = await prisma.employee_Shifts.findMany({
        where:{
            date:{
                gte: beginDate.toISO()!,
                lte: endDate.toISO()!
            }
            
        }
    })
    

    const availabilities = await prisma.employee_Availability.findMany()

    const av_time_blocks = await prisma.employee_Availability_Time_Block.findMany()

     const ov_time_blocks = await prisma.employee_Override_Time_Block.findMany()
   
    console.log(av_time_blocks)


    return {employeeList,shifts, availabilities,av_time_blocks,ov_time_blocks}
}