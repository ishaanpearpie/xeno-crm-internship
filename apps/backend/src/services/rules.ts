import { Prisma } from '@prisma/client';

export type ComparisonOperator = 'gt' | 'gte' | 'lt' | 'lte' | 'eq';

export type RuleCondition =
  | { field: 'totalSpend'; op: ComparisonOperator; value: number }
  | { field: 'totalVisits'; op: ComparisonOperator; value: number }
  | { field: 'inactiveDays'; op: ComparisonOperator; value: number };

export interface SegmentRules {
  operator: 'AND' | 'OR';
  conditions: RuleCondition[];
}

export function buildCustomerWhereFromRules(rules: SegmentRules): Prisma.CustomerWhereInput {
  const predicates: Prisma.CustomerWhereInput[] = [];

  for (const condition of rules.conditions) {
    if (condition.field === 'totalSpend') {
      const amount = new Prisma.Decimal(condition.value);
      predicates.push({
        totalSpend: mapDecimalComparison(condition.op, amount),
      });
    } else if (condition.field === 'totalVisits') {
      const visits = condition.value;
      predicates.push({
        totalVisits: mapIntComparison(condition.op, visits),
      });
    } else if (condition.field === 'inactiveDays') {
      const cutoff = new Date(Date.now() - condition.value * 24 * 60 * 60 * 1000);
      // inactiveDays >= X means lastVisit <= now - X days OR null
      const comparison = mapDateComparison(condition.op, cutoff);
      // Allow null lastVisit to be considered inactive when op is gte, gt
      if (condition.op === 'gte' || condition.op === 'gt') {
        predicates.push({ OR: [{ lastVisit: null }, { lastVisit: comparison }] });
      } else {
        predicates.push({ lastVisit: comparison });
      }
    }
  }

  if (predicates.length === 0) return {};

  return rules.operator === 'AND' ? { AND: predicates } : { OR: predicates };
}

function mapDecimalComparison(op: ComparisonOperator, value: Prisma.Decimal) {
  switch (op) {
    case 'gt':
      return { gt: value };
    case 'gte':
      return { gte: value };
    case 'lt':
      return { lt: value };
    case 'lte':
      return { lte: value };
    case 'eq':
      return { equals: value };
  }
}

function mapIntComparison(op: ComparisonOperator, value: number) {
  switch (op) {
    case 'gt':
      return { gt: value };
    case 'gte':
      return { gte: value };
    case 'lt':
      return { lt: value };
    case 'lte':
      return { lte: value };
    case 'eq':
      return { equals: value };
  }
}

function mapDateComparison(op: ComparisonOperator, value: Date) {
  switch (op) {
    case 'gt':
      return { gt: value };
    case 'gte':
      return { gte: value };
    case 'lt':
      return { lt: value };
    case 'lte':
      return { lte: value };
    case 'eq':
      return { equals: value };
  }
}


