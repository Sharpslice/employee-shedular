import { DateTime } from "luxon"
import prisma from "../../../db/db"






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
    
    

    const employees = await prisma.employee.findMany({
        select:{
            id:true,
            name:true,
            isWorking:true,
            picture:true,
            role:true,
            color:true,
            position:true

        },
        where:{
            employment:{
                some:{
                    
                    start_date: {
                        lte: beginDate.toISO()!,
                        
                    },
                    OR:[
                        {end_date:null},
                        {end_date:{gte:beginDate.toISO()!}}
                    ]
                    

                    
                    

                    
                }
            }
        },
        orderBy: {
            id:'asc'
        }
    })
   
    
    const schedule = await prisma.$queryRaw`
        SELECT 
            e.id,
            c.date,
            (
                SELECT COALESCE( JSON_AGG(
                    JSON_BUILD_OBJECT
                    (
                        'id', s.id,
                        'employee_id', s.employee_id,
                        'date' , s.date,
                        'start_time', s.start_time,
                        'end_time', s.end_time,
                        'status', (SELECT
                             CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM employee_time_override o
                    WHERE o.shift_id = s.id
                    AND s.date = o.date
                )
                THEN 'OVERIDDEN'
            
                WHEN NOT EXISTS (
                    SELECT 1
                    FROM employee_weekly_availability wa
                    JOIN employee_weekly_availability_time_block watb
                        ON wa.id = watb.employee_weekly_availability_id
                    WHERE 
                        wa.date = s.date
                        AND wa.employee_id = s.employee_id
                        AND s.start_time >= watb.start_time 
                        AND s.end_time <= watb.end_time
                
                ) 
                AND NOT EXISTS(
                    SELECT 1
                    FROM employee_availability a 
                    JOIN employee_availability_time_block atb
                        ON a.id = atb.employee_availability_id
                    WHERE 
                        a.day_of_week = EXTRACT(DOW FROM s.date)
                        AND a.employee_id = s.employee_id
                        AND s.start_time >= atb.start_time
                        AND s.end_time <= atb.end_time
                )
                THEN 'CONFLICT'


            


                            END)

                        
                    )
                ), '[]'::json)
                FROM employee_shifts s
                WHERE s.employee_id = e.id
                AND s.date = c.date
    
            ) as shifts,

            (
                SELECT 
                    JSON_BUILD_OBJECT
                    (
                        'id', a.id,
                        'employee_id',a.employee_id,
                        'day_of_week', a.day_of_week,
                        'is_available', a.is_available,
                        'effective_from', a.effective_from,
                        'time_blocks', 
                        (
                            SELECT COALESCE (JSON_AGG(
                                JSON_BUILD_OBJECT(
                                    'id',atb.id,
                                    'employee_availability_id',atb.employee_availability_id,
                                    'start_time' , atb.start_time,
                                    'end_time', atb.end_time
                                )
                                
                            ),'[]'::json)
                            FROM employee_availability_time_block atb
                            WHERE atb.employee_availability_id = a.id
                        ) 
                    )
                
                FROM employee_availability a
                WHERE a.employee_id = e.id
                AND a.day_of_week = EXTRACT(DOW FROM c.date)
                AND a.effective_from <= c.date
            

            ) as availabilities,

            (
                SELECT 
                    JSON_BUILD_OBJECT(
                        'id', wa.id,
                        'employee_id', wa.employee_id,
                        'date', wa.date,
                        'is_available', wa.is_available,
                        'status' , wa.status,
                        'time_blocks', (
                            SELECT COALESCE(JSON_AGG(
                                JSON_BUILD_OBJECT(
                                    'id', watb.id,
                                    'employee_weekly_availability_id', watb.employee_weekly_availability_id,
                                    'start_time', watb.start_time,
                                    'end_time', watb.end_time
                                )
                            ), '[]'::json)
                            FROM employee_weekly_availability_time_block watb
                            WHERE watb.employee_weekly_availability_id = wa.id
                        )
                    )
           
                FROM employee_weekly_availability wa
                WHERE wa.employee_id = e.id
                AND wa.date = c.date
            ) AS weekly_availability,

            ( 
                SELECT COALESCE(JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', o.id,
                        'employee_id', o.employee_id,
                        'date', o.date,
                        'shift_id',o.shift_id
                    
                    )
                
                
                ),'[]'::json)
                FROM employee_time_override o
                WHERE c.date = o.date
                AND o.employee_id = e.id
            
            ) as overrides
            
            
        FROM calendar c
        CROSS JOIN employee e
        INNER JOIN employee_employment_history eh
            ON eh.employee_id = e.id
            AND eh.start_date <= ${endDate.toJSDate()} AND (eh.end_date is NULL OR eh.end_date >= ${beginDate.toJSDate()})
        WHERE c.date BETWEEN ${beginDate.toJSDate()} AND ${endDate.toJSDate()}
        ORDER BY e.id

    `
    console.log(schedule)
    




    
   
    


    return {schedule,dates,employees}
}