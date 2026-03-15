import axios from "axios"

export const deleteShift = async(shift_id:number)=>{
        await axios.delete(`http://localhost:3000/api/v1/shifts/${shift_id}`,{withCredentials:true})
    }



export const createShift =async(employee_id:number,date:string)=>{
    
    await axios.post(`http://localhost:3000/api/v1/employees/${employee_id}/shifts`,{date},{withCredentials:true})

}