import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { Prisma } from '@prisma/client';

const router = Router();

const orderSchema = z.object({
  customerEmail: z.string().email(),
  amount: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)]),
  status: z.string().min(1),
  orderDate: z.string().datetime(),
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = orderSchema.parse(req.body);
    const customer = await prisma.customer.findUnique({ where: { email: body.customerEmail } });
    if (!customer) {
      return res.status(400).json({ message: 'Customer not found' });
    }
    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        amount: new Prisma.Decimal(body.amount as any),
        status: body.status,
        orderDate: new Date(body.orderDate),
      },
    });
    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        totalSpend: new Prisma.Decimal(customer.totalSpend).plus(new Prisma.Decimal(body.amount as any)),
        totalVisits: customer.totalVisits + 1,
        lastVisit: new Date(body.orderDate),
      },
    });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

router.post('/batch', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = z.array(orderSchema).parse(req.body);
    let count = 0;
    for (const item of input) {
      const customer = await prisma.customer.findUnique({ where: { email: item.customerEmail } });
      if (!customer) continue;
      await prisma.order.create({
        data: {
          customerId: customer.id,
          amount: new Prisma.Decimal(item.amount as any),
          status: item.status,
          orderDate: new Date(item.orderDate),
        },
      });
      await prisma.customer.update({
        where: { id: customer.id },
        data: {
          totalSpend: new Prisma.Decimal(customer.totalSpend).plus(new Prisma.Decimal(item.amount as any)),
          totalVisits: customer.totalVisits + 1,
          lastVisit: new Date(item.orderDate),
        },
      });
      count += 1;
    }
    res.status(202).json({ count });
  } catch (err) {
    next(err);
  }
});

export default router;


