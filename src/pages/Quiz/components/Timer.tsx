import { useEffect, useState } from "react";

const Timer = ({ duration, onTimeUp, isPaused, questionNumber }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [questionNumber, duration]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onTimeUp, timeLeft]);

  const percent = (timeLeft / duration) * 100;
  const warning = timeLeft <= 5;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Time remaining
        </span>
        <span
          className={`text-lg font-bold ${
            warning ? "text-red-600" : "text-blue-600"
          }`}
        >
          {timeLeft}s
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-1000 ${
            warning ? "bg-red-500" : "bg-blue-500"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
