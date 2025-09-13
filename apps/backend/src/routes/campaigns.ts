import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { buildCustomerWhereFromRules } from '../services/rules';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        segment: true,
        _count: { select: { communicationLogs: true } },
      },
    });
    res.json(campaigns);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = z.object({
      name: z.string().min(1),
      message: z.string().min(1),
      segmentId: z.string().uuid().optional(),
      // Alternatively, create segment ad-hoc with rules
      rules: z.any().optional(),
      createdById: z.string(),
    });
    const body = schema.parse(req.body);

    let segmentId = body.segmentId;
    if (!segmentId && body.rules) {
      const segment = await prisma.segment.create({
        data: {
          name: body.name + ' segment',
          rules: body.rules,
          createdById: body.createdById,
        },
      });
      segmentId = segment.id;
    }

    if (!segmentId) return res.status(400).json({ message: 'segmentId or rules required' });

    const campaign = await prisma.campaign.create({
      data: {
        name: body.name,
        message: body.message,
        createdById: body.createdById,
        segmentId,
        status: 'running',
      },
    });

    // Enqueue or directly simulate delivery for MVP
    const seg = await prisma.segment.findUnique({ where: { id: segmentId } });
    const where = buildCustomerWhereFromRules(seg?.rules as any);
    const customers = await prisma.customer.findMany({ where });

    for (const c of customers) {
      const personalized = body.message.replace(/\{\{name\}\}/g, c.name);
      const log = await prisma.communicationLog.create({
        data: {
          campaignId: campaign.id,
          customerId: c.id,
          message: personalized,
          status: Math.random() < 0.9 ? 'sent' : 'failed',
          sentAt: new Date(),
          failureReason: undefined,
        },
      });
      // Simulate vendor calling back after short delay: in MVP, update directly
      if (log.status === 'sent') {
        await prisma.communicationLog.update({
          where: { id: log.id },
          data: { status: 'delivered', deliveredAt: new Date() },
        });
      }
    }

    await prisma.campaign.update({ where: { id: campaign.id }, data: { status: 'completed', completedAt: new Date() } });

    res.status(201).json(campaign);
  } catch (err) {
    next(err);
  }
});

export default router;


