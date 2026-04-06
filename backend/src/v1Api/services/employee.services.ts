import { DateTime } from "luxon"
import prisma from "../../../db/db"



// export async function scheduleService(
//     beginDate:DateTime,endDate:DateTime
// ){




// }



export async function scheduleService(
    beginDate:DateTime,endDate:DateTime
){
    const dates = await prisma.calendar.findMany({
        where:{
            date:{
                gte:beginDate.toISO()!,
                lte:endDate.toISO()!
            }
            
        },
    })
    
    //console.log(dates)
    
    const schedule = await prisma.$queryRaw`
        SELECT 
            e.id,
            c.date,
            COALESCE(
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', s.id,
                        'date',s.date,
                        'start_time',s.start_time,
                        'end_time',s.end_time
                    )
                ) FILTER (WHERE s.id IS NOT NULL), '[]'::json) as shifts,
            COALESCE(
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', atb.id,
                        'start_time',atb.start_time,
                        'end_time',atb.end_time
                        
                    )
                ) FILTER (WHERE atb.id IS NOT NULL), '[]'::json) as availability_time_blocks,     
            COALESCE(
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', o.id,
                        'employee_id', o.employee_id,
                        'date',o.date,
                        'type',o.type,
                        'note',o.note,
                        'shift_id',o.shift_id,
                        'status',o.status
                    )
                ) FILTER (WHERE o.id IS NOT NULL), '[]'::json) as override,
            COALESCE(
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'start_time', otb.start_time,
                    'end_time', otb.end_time
                )
            ) FILTER (WHERE otb.id IS NOT NULL),'[]'::json ) AS override_time_blocks
        FROM calendar c
        CROSS JOIN employee e
        LEFT JOIN employee_shifts s 
            ON s.employee_id = e.id 
            AND s.date = c.date
        LEFT JOIN employee_time_override o
            ON o.employee_id = e.id
            AND o.date = c.date
        LEFT JOIN employee_override_time_block otb
            ON otb.employee_time_override_id = o.id
        LEFT JOIN employee_availability a
            ON a.employee_id = e.id
            AND a.day_of_week = c.days_of_week
        LEFT JOIN employee_availability_time_block atb
            ON atb.employee_availability_id =  a.id
        INNER JOIN employee_employment_history eh
            ON eh.employee_id = e.id
            AND eh.start_date <= ${endDate.toJSDate()} AND (eh.end_date is NULL OR eh.end_date >= ${beginDate.toJSDate()})
        WHERE c.date BETWEEN ${beginDate.toJSDate()} AND ${endDate.toJSDate()}
        GROUP BY e.id,c.date
        ORDER BY e.id
    `
    console.log(schedule)




    const employeeList = await prisma.employee.findMany(
    {
        select:{
            id:true,
            name:true,
            isWorking:true,
            color:true,
            position:true,
            shifts:{
                where:{
                    date:{
                        gte:beginDate.toISO()!,
                        lte:endDate.toISO()!
                    }
                }
            },
            override:{
                where:{
                    date:{
                        gte:beginDate.toISO()!,
                        lte:endDate.toISO()!
                    }
                }
            }
            },
        where:{
            employment:{
                some:{
                    OR:[
                        {
                            AND:{
                                start_date:{
                                    lte:endDate.toISO()!
                                },
                                end_date:{
                                    equals:null
                                }
                            },
                            
                        },
                        {
                            AND:{
                                start_date:{
                                    lte:endDate.toISO()!
                                },
                                end_date:{
                                    gte:beginDate.toISO()!
                                }
                            }
                        }
                    ]

                }
            }
        },
      
        orderBy:{
            index:'asc'
        },
        
    }
    )
    //console.log(employeeList)

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
   
    


    return {employeeList,shifts, availabilities,av_time_blocks,overrides,ov_time_blocks}
}