import express from 'express';
import { getPlace, health, listPlaces } from './controllers';

const router = express.Router();
router.get('/', health);
router.get('/places', listPlaces);
router.get('/places/:id', getPlace);

export default router;
