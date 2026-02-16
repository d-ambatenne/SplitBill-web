import type { SplitResult } from "../logic/splitCalculator";

interface BillResultProps {
  result: SplitResult;
}

export default function BillResult({ result }: BillResultProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-2xl font-bold text-gray-900">
        {result.description}
      </h2>
      <p className="mb-4 text-lg text-gray-500">
        Total: €{result.totalAmount.toFixed(2)}
      </p>

      <div className="space-y-2">
        {result.shares.map((share) => (
          <div
            key={share.name}
            className="flex items-center justify-between rounded-lg bg-teal-50 px-4 py-3"
          >
            <span className="text-xl font-medium text-gray-900">
              {share.name}
            </span>
            <span className="text-xl font-bold text-teal-700">
              €{share.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
