import axios from "axios"
import type { Override } from "../Dashboard/Interfaces/Override";
import type { Availability } from "../Dashboard/Interfaces/Availability";

import type { Day } from "../Dashboard/Interfaces/Day";
import type { Employee } from "../Dashboard/Interfaces/Employee";
import type { TimeBlock } from "../Dashboard/Interfaces/TimeBlock";
type response ={
    success:boolean;
    override: Override
}

export const createOverride = async(employee_id:number,date:string)=>{
        try{
           const response=  await axios.post<response>(`http://localhost:3000/api/v1/employees/${employee_id}/overrides/leaves`,
            {note:'test',date:date},{withCredentials:true}
        )
            if(response.data.success){
               //
                
            }
        }catch(err){
            console.error(err)
        }
        
        
    }

export const createAvailabilityOverride =async(time: string, slot: 'start' | 'end',employee_id:number,date:string,time_block:TimeBlock | null)=>{
    try{
       
        const response = await axios.post(`http://localhost:3000/api/v1/employees/${employee_id}/overrides/availabilities`,
            
               slot==='start' 
                    ?{
                        date:date,
                        start_time: time,
                        time_block: time_block
                    }

                    :{
                        date:date,
                        end_time: time,
                        time_block: time_block
                    },
                    {withCredentials:true}
                )
            
        if(response.data.success){
            console.log('succeessful query')
        }
    }catch(error:unknown){
        console.error('failed to update availability override: ',error)
    }
}

export const deleteOverride= async(override_id:number)=>{
        await axios.delete(`http://localhost:3000/api/v1/overrides/${override_id}`,{withCredentials:true})
    }
type Override_status = 'APPROVED' | 'PENDING' | 'DENIED'
export const updateOverrideStatus = async (override_id:number,status: Override_status) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/overrides/${override_id}/status`,{ status },{ withCredentials: true });

            if(response.data.success){
                console.log('success')
            }
            else{
                console.log('failed')
            }
        } catch (error) {
            console.error("Failed to update override status:", error);
        }
    };