const QuestionCard = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  isSubmitted,
}) => {
  const getAnswerClass = (option) => {
    if (!isSubmitted) {
      return selectedAnswer === option
        ? "bg-blue-100 border-blue-500"
        : "bg-white border-gray-300 hover:bg-gray-50";
    }

    if (option === question.correctAnswer)
      return "bg-green-100 border-green-500";
    if (selectedAnswer === option) return "bg-red-100 border-red-500";

    return "bg-white border-gray-300";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            disabled={isSubmitted}
            onClick={() => onAnswerSelect(option)}
            className={`w-full text-left p-4 border-2 rounded-lg transition-colors duration-200 ${getAnswerClass(
              option
            )} ${isSubmitted ? "cursor-default" : "cursor-pointer"}`}
          >
            <span className="font-medium">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
