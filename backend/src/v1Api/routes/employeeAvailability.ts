

import express from 'express'

import { validateAvailabilityOverride } from '../middleware/override.middleware/validateCreateAvailabilityOverride'
import { deleteWeeklyAvailabilityException } from '../controllers/employeeAvailability.controller'
const employeeAvailabilities = express.Router()

//employeeAvailabilities.get('/',validateAvailabilityOverride,createTimeOverride)

employeeAvailabilities.delete('/:exception_id',deleteWeeklyAvailabilityException)



export default employeeAvailabilities




