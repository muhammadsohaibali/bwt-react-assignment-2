import { useState, useEffect } from "react";
import { fetchQuestions, initializeQuizState } from "./helpers/quiz";
import Timer from "./components/Timer";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";

function QuizPage() {
  const [qs, setQs] = useState([]);
  const [quiz, setQuiz] = useState(initializeQuizState());
  const [picked, setPicked] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [done, setDone] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const qNow = qs[quiz.currentQuestionIndex];
  const total = qs.length;
  const timerSec = 5;

  useEffect(() => {
    getQs();
  }, []);

  useEffect(() => {
    if (qNow && !done) {
      const t = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => clearInterval(t);
    }
  }, [qNow, done]);

  async function getQs() {
    try {
      setLoading(true);
      setErr(null);
      const data = await fetchQuestions();
      setQs(data);
    } catch {
      setErr("could not load questions :(");
    } finally {
      setLoading(false);
    }
  }

  function pickAnswer(ans) {
    if (!done) setPicked(ans);
  }

  function submit() {
    if (!picked || !qNow) return;
    const ok = picked === qNow.correctAnswer;
    const ansObj = {
      questionId: qNow.id,
      selectedAnswer: picked,
      isCorrect: ok,
      timeSpent: seconds,
    };
    setQuiz((prev) => ({
      ...prev,
      score: prev.score + (ok ? 1 : 0),
      answers: [...prev.answers, ansObj],
    }));
    setDone(true);
    setTimeout(next, 1500);
  }

  function timeUp() {
    if (!qNow) return;
    setQuiz((prev) => ({
      ...prev,
      answers: [
        ...prev.answers,
        {
          questionId: qNow.id,
          selectedAnswer: "",
          isCorrect: false,
          timeSpent: seconds,
        },
      ],
    }));
    next();
  }

  function next() {
    setSeconds(0);
    if (quiz.currentQuestionIndex < total - 1) {
      setQuiz((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
      setPicked(null);
      setDone(false);
    } else {
      setQuiz((prev) => ({ ...prev, isFinished: true }));
    }
  }

  function restart() {
    setQuiz(initializeQuizState());
    setPicked(null);
    setDone(false);
    setSeconds(0);
    getQs();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>loading questions...</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{err}</p>
          <button
            onClick={getQs}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            try again
          </button>
        </div>
      </div>
    );
  }

  if (quiz.isFinished) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <ResultScreen
          questions={qs}
          answers={quiz.answers}
          score={quiz.score}
          onRestart={restart}
        />
      </div>
    );
  }

  if (!qNow) {
    return <p className="text-center text-red-600">no questions!</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 mb-6 rounded shadow">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold">Quiz App</h1>
            <span className="bg-blue-100 px-3 py-1 rounded">
              Q {quiz.currentQuestionIndex + 1} / {total}
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{
                width: `${((quiz.currentQuestionIndex + 1) / total) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <Timer
          duration={timerSec}
          onTimeUp={timeUp}
          isPaused={done}
          questionNumber={quiz.currentQuestionIndex}
        />

        <QuestionCard
          question={qNow}
          selectedAnswer={picked}
          onAnswerSelect={pickAnswer}
          isSubmitted={done}
        />

        <div className="flex justify-between mt-6">
          <span>
            Score: {quiz.score} / {total}
          </span>
          <button
            onClick={submit}
            disabled={!picked || done}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded"
          >
            {done ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
