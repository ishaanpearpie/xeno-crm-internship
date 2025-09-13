import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { buildCustomerWhereFromRules, SegmentRules } from '../services/rules';

const router = Router();

const rulesSchema: z.ZodType<SegmentRules> = z.object({
  operator: z.enum(['AND', 'OR']),
  conditions: z.array(
    z.union([
      z.object({ field: z.literal('totalSpend'), op: z.enum(['gt','gte','lt','lte','eq']), value: z.number() }),
      z.object({ field: z.literal('totalVisits'), op: z.enum(['gt','gte','lt','lte','eq']), value: z.number().int() }),
      z.object({ field: z.literal('inactiveDays'), op: z.enum(['gt','gte','lt','lte','eq']), value: z.number().int().positive() }),
    ])
  ),
});

router.post('/preview', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = rulesSchema.parse(req.body);
    const where = buildCustomerWhereFromRules(body);
    const count = await prisma.customer.count({ where });
    res.json({ audienceSize: count });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = z.object({ name: z.string().min(1), description: z.string().optional(), rules: rulesSchema, createdById: z.string() });
    const body = schema.parse(req.body);
    const segment = await prisma.segment.create({
      data: {
        name: body.name,
        description: body.description,
        rules: body.rules as any,
        createdById: body.createdById,
      },
    });
    res.status(201).json(segment);
  } catch (err) {
    next(err);
  }
});

export default router;


