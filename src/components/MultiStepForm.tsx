import { useState } from "react";
import { useForm } from "react-hook-form";

// 1. Wir definieren unsere Datenstruktur mit TypeScript
interface FormData {
  vorname: string;
  nachname: string;
  auswahl: string;
}

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  // 2. Wir initialisieren React Hook Form und übergeben unser Interface <FormData>
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched", // Validiert Felder, sobald der Nutzer sie verlässt
  });

  // 3. Logik für den "Weiter"-Button
  const handleNext = async () => {
    const isStepValid = await trigger(["vorname", "nachname"]);
    if (isStepValid) {
      setStep(2);
    }
  };

  return (
    <form className="multi-step-form">
      {step === 1 && (
        <div className="form-step">
          <h2>Schritt 1: Persönliche Daten</h2>

          <label>
            Vorname:
            <input
              type="text"
              {...register("vorname", {
                required: "Der Vorname ist ein Pflichtfeld.",
                minLength: {
                  value: 2,
                  message: "Mindestens 2 Zeichen erforderlich.",
                },
              })}
            />
            {/* Das optionale Chaining (?) ist in TS nützlich, falls errors.vorname undefined ist */}
            {errors.vorname && (
              <p style={{ color: "red" }}>{errors.vorname.message}</p>
            )}
          </label>
          <br />
          <br />

          <label>
            Nachname:
            <input
              type="text"
              {...register("nachname", {
                required: "Der Nachname ist ein Pflichtfeld.",
              })}
            />
            {errors.nachname && (
              <p style={{ color: "red" }}>{errors.nachname.message}</p>
            )}
          </label>
          <br />
          <br />

          <button type="button" onClick={handleNext}>
            Weiter
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <h2>Schritt 2: Auswahl</h2>

          <label>
            Deine Auswahl:
            <select
              {...register("auswahl", {
                required: "Bitte triff eine Auswahl.",
              })}
            >
              <option value="">Bitte wählen...</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
            {errors.auswahl && (
              <p style={{ color: "red" }}>{errors.auswahl.message}</p>
            )}
          </label>
          <br />
          <br />

          <button type="button" onClick={() => setStep(1)}>
            Zurück
          </button>
          <button type="submit">Absenden</button>
        </div>
      )}
    </form>
  );
}
