import prisma from './db'
import {startOfMonth,format, addYears, getWeekOfMonth,subMonths} from 'date-fns';
async function fillCalendar(){

    const today = new Date();

    //const firstDayOfCurrentMonth = format(startOfMonth(today),'yyyy-MM-dd');
    const twoYearsLater = format(addYears(startOfMonth(today),2),'yyyy-MM-dd');


    const firstDayOfLastMonth = format( subMonths(startOfMonth(today),1),'yyyy-MM-dd' )

    


    await prisma.$executeRaw`
    
        INSERT INTO calendar(date,day_of_month,days_of_week,week,month,year,is_weekend,is_holiday,holiday_name)
        SELECT 
            d::date,
            EXTRACT (DAY FROM d),
            EXTRACT (DOW FROM d),
            FLOOR ( 
                ( ( EXTRACT (DAY FROM d)-1 ) + ( EXTRACT ( DOW from DATE_TRUNC('month',d) ) ) )  /7 
            ) +1 ,
            EXTRACT (MONTH FROM d),
            EXTRACT (YEAR FROM d),
            (EXTRACT (DOW FROM d)=0 OR EXTRACT(DOW FROM d)=6),
            FALSE,
            NULL
        FROM
            generate_series(
            ${firstDayOfLastMonth}::date,
            ${twoYearsLater}::date,
            INTERVAL '1 day'
            
            ) as d
        ON CONFLICT (date) DO NOTHING
        
    `
    console.log('fill completed')
}


fillCalendar();