const ResultScreen = ({ questions, answers, score, onRestart }) => {
  const totalQs = questions.length;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Done!</h1>

        <div className="bg-blue-50 rounded-lg p-6 mb-4">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {score} / {totalQs}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Answers
        </h2>

        <div className="space-y-4">
          {questions.map((q, i) => {
            const ans = answers.find((x) => x.questionId === q.id);
            return (
              <div key={q.id} className="border rounded-lg p-4">
                <p className="font-medium text-gray-800 mb-2">
                  Q{i + 1}: {q.question}
                </p>

                <div className="space-y-1">
                  <p className="text-sm text-green-600">
                    Correct: {q.correctAnswer}
                  </p>
                  <p
                    className={`text-sm ${
                      ans && ans.isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    Your answer: {ans?.selectedAnswer || "Skipped"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Time spent: {ans?.timeSpent || 0}s
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Restart Quiz
        </button>
        <p className="text-green-600 mt-4 font-medium">Results saved!</p>
      </div>
    </div>
  );
};

export default ResultScreen;
