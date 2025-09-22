export default function Summary({ data }) {
  const handleSubmit = () => {
    console.log("Final Data:", data);
    alert("Form submitted");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
