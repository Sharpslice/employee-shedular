import { DateTime } from "luxon"
import prisma from "../../../db/db"



export async function scheduleService(beginDate:DateTime,endDate:DateTime){
    const employeeList = await prisma.employee.findMany(
    {
        select:{
            id:true,
            name:true,
            isWorking:true,
            color:true,
            position:true,
            },
        orderBy:{
            index:'asc'
        }
    }
    )


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

    const overrides = await prisma.employee_Time_Override.findMany()

    const ov_time_blocks = await prisma.employee_Override_Time_Block.findMany()
   
    console.log(overrides)


    return {employeeList,shifts, availabilities,av_time_blocks,overrides,ov_time_blocks}
}