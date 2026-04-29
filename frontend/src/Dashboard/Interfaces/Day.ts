export interface Day{
    week:number,
    date: string,
    days_of_week:number,
    day_of_month:number
    month: number
    is_weekend:boolean,
    is_holiday:boolean
    holiday_name?: string
}