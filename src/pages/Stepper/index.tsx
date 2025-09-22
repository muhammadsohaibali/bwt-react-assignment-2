import { useState } from "react";
import Stepper from "./components/Stepper";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import Summary from "./components/Summary";

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preference: "",
  });

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const steps = [
    <StepOne data={formData} setData={setFormData} next={next} />,
    <StepTwo data={formData} setData={setFormData} next={next} prev={prev} />,
    <StepThree data={formData} setData={setFormData} next={next} prev={prev} />,
    <Summary data={formData} />,
  ];

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <Stepper current={step} total={4} />
      <div className="mt-8 w-full max-w-md bg-white p-6 rounded-xl shadow">
        {steps[step - 1]}
      </div>
    </div>
  );
}
