import axios from "axios"

import { DateTime } from "luxon"
import type { Shift } from "../Dashboard/Interfaces/Shift"


export const deleteShift = async(shift_id:number)=>{
        await axios.delete(`http://localhost:3000/api/v1/shifts/${shift_id}`,{withCredentials:true})
    }



export const createShift =async(employee_id:number,date:string)=>{
    
    await axios.post(`http://localhost:3000/api/v1/employees/${employee_id}/shifts`,{date},{withCredentials:true})
}


export const updateShiftTime = async(time: string, slot: 'start' | 'end',shift:Shift)=>{
       
        
        const formattedDate = DateTime.fromISO(shift.date,{zone:'utc'}).toISODate();
   
        try{
            await axios.patch(`http://localhost:3000/api/v1/employees/${shift.employee_id}/shifts/${shift.id}`,
                    slot==='start' 
                    ?{
                        date:formattedDate,
                        start_time: time,
                    }

                    :{
                        date:formattedDate,
                        end_time: time
                    },
                    {withCredentials:true}
                
                )
            
          
        
        }catch(error:unknown){
            if(error instanceof Error){
                console.error(error.message)
            }
        }
    
    }