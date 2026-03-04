import express from "express"
import { createAvailabilityOverride, createLeave } from "../controllers/employeeOverride.controller";
import { validateAvailabilityOverride } from "../middleware/override.middleware/validateCreateAvailabilityOverride";



const employeeOverrides = express.Router({mergeParams:true});


employeeOverrides.post('/',validateAvailabilityOverride, createAvailabilityOverride)

employeeOverrides.post('/leaves',createLeave)


export default employeeOverrides;