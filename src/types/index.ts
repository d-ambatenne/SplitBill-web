export interface Participant {
  name: string;
}

export interface BillInput {
  description: string;
  totalAmount: number;
  participants: Participant[];
}

export interface SplitResult {
  description: string;
  totalAmount: number;
  shares: { name: string; amount: number }[];
}
