import express from 'express';
import prisma from '../../../db/db';
import { io } from '../../app';

import { validateAvailabilityOverride } from '../middleware/override.middleware/validateCreateAvailabilityOverride';
import { deleteOverride } from '../controllers/override.controller';

const overrides = express.Router()

overrides.delete('/:override_id',deleteOverride)

export default overrides