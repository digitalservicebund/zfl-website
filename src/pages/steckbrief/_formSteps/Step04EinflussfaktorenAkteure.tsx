import { useFormContext } from "react-hook-form";
import type { Inputs } from "./types";

export default function Step04EinflussfaktorenAkteure() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Einflussfaktoren</h2>
        <p>
          Benennen Sie alle maßgeblichen Rahmenbedingungen und Abhängigkeiten,
          die den Erfolg des Vorhabens beeinflussen können.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="einflussfaktoren">
          Einflussfaktoren Ihres Vorhabens
        </label>
        <div class="kern-hint" id="einflussfaktoren-hint">
          Nennen Sie relevante externe Faktoren, rechtliche Rahmenbedingungen
          oder politische Abhängigkeiten.
        </div>
        <textarea
          class="kern-form-input__input"
          id="einflussfaktoren"
          aria-required="true"
          aria-describedby="einflussfaktoren-hint"
          {...register("einflussfaktoren")}
        />
      </div>

      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Relevante Akteure</h2>
        <p>
          Führen Sie alle außenstehenden Personen oder Interessengruppen auf,
          die vom Vorhaben betroffen sind oder Einfluss darauf nehmen.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="relevanteAkteure">
          Relevante Akteure Ihres Vorhabens
        </label>
        <textarea
          class="kern-form-input__input"
          id="relevanteAkteure"
          aria-required="true"
          {...register("relevanteAkteure")}
        />
      </div>
    </>
  );
}
