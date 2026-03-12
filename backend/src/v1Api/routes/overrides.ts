import express from 'express';
import prisma from '../../../db/db';
import { io } from '../../app';

import { validateAvailabilityOverride } from '../middleware/override.middleware/validateCreateAvailabilityOverride';
import { deleteOverride, updateOverrideStatus } from '../controllers/override.controller';

const overrides = express.Router()

overrides.delete('/:override_id',deleteOverride)

overrides.patch('/:override_id/status',updateOverrideStatus)
export default overrides