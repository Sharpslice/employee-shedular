import { Navigate, useParams } from "react-router-dom";
import DayView from "./Dashboard/views/DayView";
import Week from "./Dashboard/views/Week";


function ScheduleRouter(){
    const {view} = useParams();
    switch(view){
        case('day'):
            return <DayView/>
        case('week'):
            return <Week/>
        default:
            return <Navigate to={'week'}/>
    }
    


    
}

export default ScheduleRouter;