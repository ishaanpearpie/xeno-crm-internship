import { prisma } from '../utils/prisma';

export async function getOrCreateUserByEmail(email: string, name?: string, googleId?: string) {
  const normalized = email.trim().toLowerCase();
  const user = await prisma.user.upsert({
    where: { email: normalized },
    update: {
      name: name ?? undefined,
      googleId: googleId ?? undefined,
    },
    create: {
      email: normalized,
      name: name || normalized.split('@')[0],
      googleId: googleId,
    },
  });
  return user;
}

export function extractUserFromRequest(req: { headers: any; body?: any }) {
  const headers = req.headers || {};
  const emailHeader = headers['x-user-email'] as string | undefined;
  const nameHeader = headers['x-user-name'] as string | undefined;
  const googleIdHeader = headers['x-user-googleid'] as string | undefined;

  const emailBody = req.body?.createdByEmail as string | undefined;
  const nameBody = req.body?.createdByName as string | undefined;
  const googleIdBody = req.body?.createdByGoogleId as string | undefined;

  const email = emailHeader || emailBody;
  const name = nameHeader || nameBody;
  const googleId = googleIdHeader || googleIdBody;
  return { email, name, googleId };
}


