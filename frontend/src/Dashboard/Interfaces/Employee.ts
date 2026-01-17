import type { Override } from "./Override"

export interface Employee{
    id:number,
    name: string
    isWorking: boolean
    picture?:string
    role: "USER" | "ADMIN"
    color?:string 
    position: string

    availability : []
    override : Override[]
}