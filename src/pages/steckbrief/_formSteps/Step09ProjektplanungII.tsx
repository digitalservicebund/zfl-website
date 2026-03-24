import { useFormContext } from "react-hook-form";
import type { Inputs } from "./types";

export default function Step09ProjektplanungII() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Zeithorizont</h2>
        <p>Beschreiben Sie hier den zeitlichen Ablauf Ihres Vorhabens.</p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="zeithorizont">
          Zeithorizont des Vorhabens
        </label>
        <textarea
          class="kern-form-input__input"
          id="zeithorizont"
          aria-required="true"
          {...register("zeithorizont")}
        />
      </div>

      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Ressourcenschätzung</h2>
        <p>
          Schätzen Sie hier ein, welche Unterstützung Sie benötigen.
          Berücksichtigen Sie dabei die Komplexität der Arbeitsschritte,
          technische Anforderungen und die Anzahl der beteiligten
          Schnittstellen. Notieren Sie auch, ob Sie zusätzliche Kapazitäten –
          etwa durch ein interdisziplinäres Team oder externe Expertise –
          einplanen müssen.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="ressourcenschaetzung">
          Ressourcenbedarf und -verfügbarkeit
        </label>
        <textarea
          class="kern-form-input__input"
          id="ressourcenschaetzung"
          aria-required="true"
          {...register("ressourcenschaetzung")}
        />
      </div>
    </>
  );
}
