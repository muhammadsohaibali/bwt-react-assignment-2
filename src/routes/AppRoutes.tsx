import Home from "../pages/Home";
import Quiz from "../pages/Quiz";
import Stepper from "../pages/Stepper";
import Todo from "../pages/Todo";

export const appRoutes = {
  home: { path: "/", label: "Home", element: Home },
  todo: { path: "/todo", label: "Todo", element: Todo },
  quiz: { path: "/quiz", label: "Quiz", element: Quiz },
  stepper: { path: "/stepper", label: "Stepper", element: Stepper },
};
