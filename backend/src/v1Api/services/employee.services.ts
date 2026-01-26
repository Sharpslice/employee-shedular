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
                gte: beginDate.toJSDate(),
                lte: endDate.toJSDate()
            }
            
        }
    })

    const availabilities = await prisma.employee_Availability.findMany({
        include:{
            time_block:true
        }
        
    })
    console.log(availabilities)



    return {employeeList,shifts, availabilities}
}