import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { env } from '../config/env';

const router = Router();

const systemPrompt = `You are a rule parser for a CRM. Convert the user's natural language into a JSON object with shape:
{
  operator: "AND" | "OR",
  conditions: Array<
    | { field: "totalSpend", op: "gt"|"gte"|"lt"|"lte"|"eq", value: number }
    | { field: "totalVisits", op: "gt"|"gte"|"lt"|"lte"|"eq", value: number }
    | { field: "inactiveDays", op: "gt"|"gte"|"lt"|"lte"|"eq", value: number }
  >
}
Assume currency is INR if mentioned. Interpret phrases like "spent more than 100" => { field: "totalSpend", op: "gt", value: 100 } and
"visited at least 3 times" => { field: "totalVisits", op: "gte", value: 3 }.
If the query mentions inactivity like "haven't shopped in 90 days" => { field: "inactiveDays", op: "gte", value: 90 }.
Respond with JSON only.`;

function heuristicParse(prompt: string) {
  const p = prompt.toLowerCase();
  const conditions: any[] = [];

  // totalSpend patterns
  const spendMore = p.match(/spen[t]?\s+(?:more than|over|greater than)\s+(\d+(?:\.\d+)?)/);
  if (spendMore) conditions.push({ field: 'totalSpend', op: 'gt', value: Number(spendMore[1]) });
  const spendAtLeast = p.match(/spen[t]?\s+(?:at least|>=?)\s+(\d+(?:\.\d+)?)/);
  if (spendAtLeast) conditions.push({ field: 'totalSpend', op: 'gte', value: Number(spendAtLeast[1]) });
  const spendLess = p.match(/spen[t]?\s+(?:less than|under|<)\s+(\d+(?:\.\d+)?)/);
  if (spendLess) conditions.push({ field: 'totalSpend', op: 'lt', value: Number(spendLess[1]) });

  // totalVisits patterns
  const visitsAtLeast = p.match(/visit(?:ed)?\s+(?:at least|>=?)\s+(\d+)/);
  if (visitsAtLeast) conditions.push({ field: 'totalVisits', op: 'gte', value: Number(visitsAtLeast[1]) });
  const visitsMore = p.match(/visit(?:ed)?\s+(?:more than|over|greater than)\s+(\d+)/);
  if (visitsMore) conditions.push({ field: 'totalVisits', op: 'gt', value: Number(visitsMore[1]) });
  const visitsLess = p.match(/visit(?:ed)?\s+(?:less than|under|<)\s+(\d+)/);
  if (visitsLess) conditions.push({ field: 'totalVisits', op: 'lt', value: Number(visitsLess[1]) });

  // inactiveDays patterns
  const inactiveDays = p.match(/(?:inactive|haven'?t\s+(?:shopped|purchased)|no\s+orders?)\s+(?:for\s+)?(\d+)\s+days?/);
  if (inactiveDays) conditions.push({ field: 'inactiveDays', op: 'gte', value: Number(inactiveDays[1]) });

  // Determine operator
  let operator: 'AND' | 'OR' = 'AND';
  if (p.includes(' or ')) operator = 'OR';

  return { operator, conditions: conditions.length ? conditions : [{ field: 'totalVisits', op: 'gte', value: 1 }] };
}

router.post('/nl-to-rules', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = z.object({ prompt: z.string().min(3) });
    const { prompt } = schema.parse(req.body);
    // If no API key, immediately use heuristic
    if (!env.OPENAI_API_KEY) {
      return res.json(heuristicParse(prompt));
    }

    try {
      // Lazy import to avoid bundling issues
      const { OpenAI } = await import('openai');
      const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
      const completion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
      });
      const text = completion.choices[0]?.message?.content || '{}';
      let parsed: any;
      try { parsed = JSON.parse(text); } catch {
        const match = text.match(/\{[\s\S]*\}/);
        if (match) parsed = JSON.parse(match[0]); else parsed = {};
      }
      if (!parsed?.conditions?.length) {
        return res.json(heuristicParse(prompt));
      }
      return res.json(parsed);
    } catch (e) {
      // Fallback to heuristic if SDK missing or call failed
      return res.json(heuristicParse(prompt));
    }
  } catch (err) {
    next(err);
  }
});

export default router;


