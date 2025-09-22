export default function Stepper({ current, total }) {
  return (
    <div className="flex justify-between w-full max-w-md">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex-1 flex flex-col items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full 
              ${current >= i + 1 ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          >
            {i + 1}
          </div>
          {i < total - 1 && (
            <div className="flex-1 h-1 bg-gray-300 w-full mx-1">
              <div
                className={`h-1 ${
                  current > i + 1 ? "bg-blue-600 w-full" : "w-0"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
