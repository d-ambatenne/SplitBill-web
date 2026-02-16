import type { SplitResult } from "../logic/splitCalculator";

interface BillHistoryProps {
  bills: SplitResult[];
  onSelect: (result: SplitResult) => void;
}

export default function BillHistory({ bills, onSelect }: BillHistoryProps) {
  if (bills.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-3 text-2xl font-bold text-gray-900">History</h2>

      <div className="space-y-2">
        {bills.map((bill, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(bill)}
            className="flex w-full items-center justify-between rounded-lg border border-gray-100 px-4 py-3 text-left hover:bg-gray-50"
          >
            <span className="text-lg font-medium text-gray-900">
              {bill.description}
            </span>
            <span className="text-lg font-semibold text-gray-600">
              €{bill.totalAmount.toFixed(2)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
