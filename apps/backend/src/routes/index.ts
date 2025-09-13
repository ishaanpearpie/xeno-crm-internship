import { Router } from 'express';
import customersRouter from './customers';
import ordersRouter from './orders';

const router = Router();

router.use('/customers', customersRouter);
router.use('/orders', ordersRouter);

export default router;


