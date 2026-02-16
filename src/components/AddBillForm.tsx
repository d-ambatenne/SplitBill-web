import { useState } from "react";
import { splitEqually } from "../logic/splitCalculator";
import type { BillInput, SplitResult } from "../logic/splitCalculator";

interface AddBillFormProps {
  onSplit: (result: SplitResult) => void;
}

export default function AddBillForm({ onSplit }: AddBillFormProps) {
  const [description, setDescription] = useState("Dinner");
  const [amount, setAmount] = useState("");
  const [names, setNames] = useState(["Person 1", "Person 2"]);
  const [errors, setErrors] = useState<string[]>([]);

  function validate(): string[] {
    const errs: string[] = [];
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      errs.push("Amount must be greater than 0.");
    }
    if (names.length < 2) {
      errs.push("At least 2 participants are required.");
    }
    if (names.some((n) => n.trim() === "")) {
      errs.push("All participant names must be filled in.");
    }
    return errs;
  }

  function handleSplit() {
    const errs = validate();
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);

    const bill: BillInput = {
      description: description || "Untitled bill",
      totalAmount: parseFloat(amount),
      participants: names.map((name) => ({ name: name.trim() })),
    };

    onSplit(splitEqually(bill));
  }

  function addParticipant() {
    setNames([...names, `Person ${names.length + 1}`]);
  }

  function removeParticipant(index: number) {
    if (names.length <= 2) return;
    setNames(names.filter((_, i) => i !== index));
  }

  function updateName(index: number, value: string) {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">New Bill</h2>

      <label className="mb-1 block text-lg font-medium text-gray-700">
        Description
      </label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-lg text-gray-900 focus:border-teal-500 focus:outline-none"
        placeholder="e.g. Dinner, Taxi, Hotel…"
      />

      <label className="mb-1 block text-lg font-medium text-gray-700">
        Total Amount (€)
      </label>
      <input
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-lg text-gray-900 focus:border-teal-500 focus:outline-none"
        placeholder="0.00"
      />

      <div className="mb-2 flex items-center justify-between">
        <label className="text-lg font-medium text-gray-700">
          Participants
        </label>
        <button
          type="button"
          onClick={addParticipant}
          className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-teal-700 hover:bg-gray-200"
        >
          + Add participant
        </button>
      </div>

      <div className="mb-4 space-y-2">
        {names.map((name, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => updateName(i, e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-lg text-gray-900 focus:border-teal-500 focus:outline-none"
            />
            {names.length > 2 && (
              <button
                type="button"
                onClick={() => removeParticipant(i)}
                className="rounded-lg px-2 py-2 text-gray-400 hover:text-red-500"
                title="Remove participant"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {errors.length > 0 && (
        <div className="mb-4 rounded-lg bg-red-50 p-3">
          {errors.map((err, i) => (
            <p key={i} className="text-sm font-medium text-red-600">
              {err}
            </p>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={handleSplit}
        className="w-full rounded-lg bg-teal-600 px-6 py-3 text-xl font-bold text-white hover:bg-teal-700"
      >
        Split
      </button>
    </div>
  );
}
