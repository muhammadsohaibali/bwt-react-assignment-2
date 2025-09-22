import { useState } from "react";

export default function StepThree({ data, setData, next, prev }) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!data.preference.trim()) return setError("Preference is required");
    next();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Preferences</h2>
      <input
        className="border p-2 w-full rounded mb-2"
        placeholder="Your Preference (e.g., dark mode)"
        value={data.preference}
        onChange={(e) => setData({ ...data, preference: e.target.value })}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-between mt-4">
        <button
          onClick={prev}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
