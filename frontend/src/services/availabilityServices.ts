import axios from "axios"

export const deleteWeeklyAvailabilityException=async(employee_id:number,exception_id:number)=>{
    try{
        await axios.delete(`http://localhost:3000/api/v1/employees/${employee_id}/availabilities/${exception_id}`)
    }catch(error:unknown){
        console.error(error)
    }
}