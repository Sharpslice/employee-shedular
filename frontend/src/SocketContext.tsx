import { createContext, useContext, useEffect, useState } from "react"
import {io,Socket} from "socket.io-client"



const SocketContext = createContext<Socket | null>(null);
export const SocketProvider =({children}:{children: React.ReactNode})=>{
    const [socket,setSocket] = useState<Socket | null>(null)

    useEffect(()=>{
        const s = io("http://localhost:3000");

       
        setSocket(s)

        
        return ()=>{s.disconnect();}
    },[])

    return (<>
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
        
    
    
    </>)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket=()=>{
    return useContext(SocketContext)
}


