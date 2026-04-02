

import express from 'express'
import { createTimeOverride } from '../controllers/employeeOverride.controller'
import { validateAvailabilityOverride } from '../middleware/override.middleware/validateCreateAvailabilityOverride'
const employeeAvailabilities = express.Router()

employeeAvailabilities.get('/',validateAvailabilityOverride,createTimeOverride)





export default employeeAvailabilities




