import type { BillInput, SplitResult } from "../types";

export type { Participant, BillInput, SplitResult } from "../types";

export function splitEqually(bill: BillInput): SplitResult {
  const count = bill.participants.length;
  const perPerson = Math.floor((bill.totalAmount / count) * 100) / 100;
  const totalDistributed = perPerson * count;
  const remainder = Math.round((bill.totalAmount - totalDistributed) * 100) / 100;

  const shares = bill.participants.map((p, i) => ({
    name: p.name,
    amount: i === 0 ? perPerson + remainder : perPerson,
  }));

  return {
    description: bill.description,
    totalAmount: bill.totalAmount,
    shares,
  };
}
