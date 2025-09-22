export async function fetchQuestions() {
  const r = await fetch(
    "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple"
  );
  const d = await r.json();

  return d.results.map((item, i) => {
    const opts = [...item.incorrect_answers, item.correct_answer].sort(
      () => Math.random() - 0.5
    );
    return {
      id: i + 1,
      question: item.question,
      options: opts,
      correctAnswer: item.correct_answer,
    };
  });
}

export function getScore(ans) {
  let total = 0;
  ans.forEach((a) => {
    if (a.isCorrect) total++;
  });
  return total;
}

export function initializeQuizState() {
  return {
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isFinished: false,
  };
}
