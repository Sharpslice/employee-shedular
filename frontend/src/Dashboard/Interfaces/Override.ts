
type Override_type = 'ILLNESS' | 'SCHOOL' | 'APPOINTMENT' | 'BIRTHDAY' | 'AVAILABLE' | 'MISC'
type Override_status = 'APPROVED' | 'PENDING' | 'DENIED'
export interface Override{
    id:number,
    employee_id: number,
    date: string,
    type: Override_type,
    note?: string,
    shift_id?:number,
    status: Override_status

}

