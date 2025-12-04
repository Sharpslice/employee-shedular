import { createContext } from "react"
import useContextMenuHook from "./useContextMenuHook"




type prop ={
    children:React.ReactNode
}
type contextMenuType = ReturnType<typeof useContextMenuHook>
const ContextMenuContext = createContext<contextMenuType | null>(null)



function ContextMenuProvider({children}:prop){
    const useContextMenu = useContextMenuHook()

    return(
        <ContextMenuContext.Provider value={useContextMenu} >
            {children}
        </ContextMenuContext.Provider>
    )


}

export {ContextMenuProvider,ContextMenuContext}