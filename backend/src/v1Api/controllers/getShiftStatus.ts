import prisma from "../../../db/db";
import { Prisma } from "../../generated/prisma";

export async function getShiftStatus(shift_id:number,db: Prisma.TransactionClient = prisma){
    const result = await db.$queryRaw<{status:string | null}[]>`
        SELECT 
           CASE
                WHEN watb.id IS NULL AND atb.id IS NULL THEN 'CONFLICT'

                WHEN s.start_time IS NULL OR s.end_time IS NULL THEN 'CONFLICT'

                WHEN s.start_time < COALESCE(watb.start_time,atb.start_time)
                OR   s.end_time > COALESCE(watb.end_time,atb.end_time) THEN 'CONFLICT'

                ELSE NULL
            END as status
            
        FROM employee_shifts s
        LEFT JOIN employee_availability a
            ON a.employee_id = s.employee_id
            AND a.day_of_week = EXTRACT(DOW FROM s.date AT TIME ZONE 'UTC')
        LEFT JOIN employee_availability_time_block atb
            ON atb.employee_availability_id = a.id
        LEFT JOIN employee_weekly_availability wa
            ON wa.employee_id = s.employee_id
            AND wa.date = s.date
        LEFT JOIN employee_weekly_availability_time_block watb
            ON watb.employee_weekly_availability_id = wa.id
        WHERE s.id = ${shift_id}
    `
   
    console.log(result[0]?.status)
    return result[0]?.status
}



            //                 s.date,
            // s.start_time,
            // s.end_time,
            // a.day_of_week,
            // a.is_available,
            // atb.id as atb_id,
            // atb.start_time as atb_start_time,
            // atb.end_time as atb_end_time,
            // watb.start_time as watb_start_time,
            // watb.end_time as watb_end_time

            // CASE
            //     WHEN watb.id IS NULL AND atb.id IS NULL THEN 'CONFLICT'

            //     WHEN s.start_time IS NULL OR s.end_time IS NULL THEN 'CONFLICT'

            //     WHEN s.start_time < COALESCE(watb.start_time,atb.start_time)
            //     OR   s.end_time > COALESCE(watb.end_time,atb.end_time) THEN 'CONFLICT'

            //     ELSE NULL
            // END as status