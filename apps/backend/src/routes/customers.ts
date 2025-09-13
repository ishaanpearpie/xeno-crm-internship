import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';

const router = Router();

const customerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  phone: z.string().optional(),
  totalSpend: z.number().nonnegative().optional(),
  totalVisits: z.number().int().nonnegative().optional(),
  lastVisit: z.string().datetime().optional(),
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = customerSchema.parse(req.body);
    const customer = await prisma.customer.upsert({
      where: { email: body.email },
      create: {
        email: body.email,
        name: body.name,
        phone: body.phone,
        totalSpend: body.totalSpend ?? 0,
        totalVisits: body.totalVisits ?? 0,
        lastVisit: body.lastVisit ? new Date(body.lastVisit) : undefined,
      },
      update: {
        name: body.name,
        phone: body.phone,
        totalSpend: body.totalSpend ?? undefined,
        totalVisits: body.totalVisits ?? undefined,
        lastVisit: body.lastVisit ? new Date(body.lastVisit) : undefined,
      },
    });
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
});

router.post('/batch', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = z.array(customerSchema).parse(req.body);
    // For MVP, insert sequentially; later we can stream to queue
    const results = [] as any[];
    for (const item of input) {
      const customer = await prisma.customer.upsert({
        where: { email: item.email },
        create: {
          email: item.email,
          name: item.name,
          phone: item.phone,
          totalSpend: item.totalSpend ?? 0,
          totalVisits: item.totalVisits ?? 0,
          lastVisit: item.lastVisit ? new Date(item.lastVisit) : undefined,
        },
        update: {
          name: item.name,
          phone: item.phone,
          totalSpend: item.totalSpend ?? undefined,
          totalVisits: item.totalVisits ?? undefined,
          lastVisit: item.lastVisit ? new Date(item.lastVisit) : undefined,
        },
      });
      results.push(customer);
    }
    res.status(202).json({ count: results.length });
  } catch (err) {
    next(err);
  }
});

export default router;


