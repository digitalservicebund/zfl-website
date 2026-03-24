import { useFormContext } from "react-hook-form";
import type { Inputs } from "./types";

export default function Step08ProjektplanungI() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Risikoeinschätzung</h2>
        <p>
          Benennen Sie potenzielle Hindernisse für Ihr Vorhaben. Nennen Sie auch
          deren Eintrittswahrscheinlichkeit.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="risikoeinschaetzung">
          Risikobetrachtung
        </label>
        <textarea
          class="kern-form-input__input"
          id="risikoeinschaetzung"
          aria-required="true"
          {...register("risikoeinschaetzung")}
        />
      </div>

      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Komplexitätsgrad des Vorhabens</h2>
        <p>
          Beurteilen Sie den Schwierigkeitsgrad des Vorhabens anhand der Anzahl
          der beteiligten Schnittstellen, der technischen Anforderungen und der
          Verflechtung einzelner Arbeitsschritte.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="komplexitaetsgrad">
          Komplexität des Vorhabens
        </label>
        <textarea
          class="kern-form-input__input"
          id="komplexitaetsgrad"
          aria-required="true"
          {...register("komplexitaetsgrad")}
        />
      </div>
    </>
  );
}
