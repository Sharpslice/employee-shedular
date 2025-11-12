import { createContext } from "react"
import useGridNavigation from "./useGridNavigation"



type GridNavContextType = ReturnType<typeof useGridNavigation>;

const GridNavigationContext = createContext<GridNavContextType | null>(null);


function GridNavigationProvider({children}:{children: React.ReactNode}){
    const gridNav = useGridNavigation();
    return(
        <GridNavigationContext.Provider value={gridNav}>
            {children}
        </GridNavigationContext.Provider>
    )
}

export {GridNavigationProvider,GridNavigationContext}