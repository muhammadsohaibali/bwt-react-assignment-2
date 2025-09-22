import { useState } from "react";

export default function StepOne({ data, setData, next }) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!data.name.trim()) return setError("Name is required");
    next();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Personal Info</h2>
      <input
        className="border p-2 w-full rounded mb-2"
        placeholder="Your Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleNext}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
}
