import { useState } from "react";

export default function StepTwo({ data, setData, next, prev }) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!data.email.trim()) return setError("Email is required");
    next();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Contact Details</h2>
      <input
        className="border p-2 w-full rounded mb-2"
        placeholder="Email"
        type="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
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
