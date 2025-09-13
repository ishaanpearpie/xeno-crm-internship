import { Router } from 'express';
import customersRouter from './customers';
import ordersRouter from './orders';
import segmentsRouter from './segments';
import campaignsRouter from './campaigns';

const router = Router();

router.use('/customers', customersRouter);
router.use('/orders', ordersRouter);
router.use('/segments', segmentsRouter);
router.use('/campaigns', campaignsRouter);

export default router;


