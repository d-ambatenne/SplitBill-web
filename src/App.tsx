import { useState } from "react";
import type { SplitResult } from "./logic/splitCalculator";
import AddBillForm from "./components/AddBillForm";
import BillResult from "./components/BillResult";
import BillHistory from "./components/BillHistory";

export default function App() {
  const [bills, setBills] = useState<SplitResult[]>([]);
  const [currentResult, setCurrentResult] = useState<SplitResult | null>(null);

  function handleSplit(result: SplitResult) {
    setCurrentResult(result);
    setBills((prev) => [result, ...prev]);
  }

  function handleSelectBill(result: SplitResult) {
    setCurrentResult(result);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="mb-8 text-center text-4xl font-extrabold text-teal-600">
          SplitBill
        </h1>

        <div className="space-y-6">
          <AddBillForm onSplit={handleSplit} />
          {currentResult && <BillResult result={currentResult} />}
          <BillHistory bills={bills} onSelect={handleSelectBill} />
        </div>
      </div>
    </div>
  );
}
