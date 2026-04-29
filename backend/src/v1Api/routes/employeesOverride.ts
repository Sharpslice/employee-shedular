import express from "express"

import { validateAvailabilityOverride } from "../middleware/override.middleware/validateCreateAvailabilityOverride";



const employeeOverrides = express.Router({mergeParams:true});


//employeeOverrides.post('/',validateAvailabilityOverride, createTimeOverride)

//employeeOverrides.post('/leaves',createLeave)
//employeeOverrides.post(`/availabilities/`,createAvailability)

export default employeeOverrides;