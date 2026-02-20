import express from 'express';
import prisma from '../../../db/db';
import { io } from '../../app';
import { createAvailabilityOverride } from '../controllers/override.controller';
import { validateAvailabilityOverride } from '../middleware/override.middleware/validateCreateAvailabilityOverride';

const overrides = express.Router()

overrides.post('/',validateAvailabilityOverride, createAvailabilityOverride)

export default overrides