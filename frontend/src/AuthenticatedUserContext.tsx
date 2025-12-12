
import axios from "axios";
import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Employee } from "./Dashboard/Interfaces/Employee";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthenticatedUser = createContext<Employee | null>(null)

type response={
    user: Employee
}

const getAuthenticatedUser =async()=>{
    try{
        const result = await axios.get<response>('http://localhost:3000/auth/google/logged-in-user',{withCredentials:true})
        
        return result.data.user
    }
    catch(error){
        console.error(error)
        return null
    }
}

function AuthProvider ({children}:{children: ReactNode}){
    const [authUser,setAuthUser] = useState<Employee | null>(null)
    useEffect(()=>{
        (async ()=>{
            const user = await getAuthenticatedUser();
            setAuthUser(user);
        })();
       
    },[])



    return (
        <AuthenticatedUser.Provider value={authUser}>
           
            {children}
        </AuthenticatedUser.Provider>
    )
}

export default AuthProvider