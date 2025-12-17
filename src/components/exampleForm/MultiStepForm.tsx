// MultiStepForm.astro.tsx
import React, { useState } from "react";

interface FormData {
  title: string;
  participation: string;
}

function StepOne(props: {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Zwischendokumentation</h2>
      <div className="mb-4">
        <label className="block mb-2" id="title">
          Titel Ihres Regelungsvorhabens
        </label>
        <input
          aria-labelledby="title"
          type="text"
          name="title"
          value={props.formData.title}
          onChange={props.onChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="button"
        onClick={props.onClick}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Weiter
      </button>
    </div>
  );
}

function StepTwo(props: {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onClick: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Auswirkungen auf Betroffene und an der Umsetzung Beteiligte
      </h2>
      <div className="mb-4">
        <label id="answer" className="block mb-2">
          Antwort
        </label>
        <p id="answer-details">
          Bitte listen Sie stichpunktartig auf, welche Erkenntnisse
          eingearbeitet wurden und geben Sie Hinweise auf Paragrafen, die
          besonders umsetzungsrelevant sind.
        </p>
        <textarea
          aria-labelledby="answer"
          aria-describedby="answer-details"
          name="participation"
          value={props.formData.participation}
          onChange={props.onChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={props.onClick}
          className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default function MultiStepForm() {
  const [step, setStep] = useState(
    Number.parseInt(localStorage.getItem("step") ?? "1", 10),
  );
  const [formData, setFormData] = useState<FormData>({
    title: "",
    participation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1 && !formData.title) {
      alert("Please fill in all required fields.");
      return;
    }
    setStep(step + 1);
    localStorage.setItem("step", `${step + 1}`);
  };

  const prevStep = () => {
    setStep(step - 1);
    localStorage.setItem("step", `${step - 1}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted: " + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="p-4 border rounded-lg shadow col-[content]">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <StepOne
            formData={formData}
            onChange={handleChange}
            onClick={nextStep}
          />
        )}

        {step === 2 && (
          <StepTwo
            formData={formData}
            onChange={handleChange}
            onClick={prevStep}
          />
        )}
      </form>
    </div>
  );
}
