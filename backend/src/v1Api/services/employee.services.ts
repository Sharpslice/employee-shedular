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
    //const shifts = shiftsRaw.map(shift => ({ ...shift, date: DateTime.fromJSDate(shift.date,{zone:'utc'}).toISODate(), }));

    const availabilities = await prisma.employee_Availability.findMany({
        include:{
            time_block:true
        }
        
    })
   



    return {employeeList,shifts, availabilities}
}