import { useFormContext } from "react-hook-form";
import type { Inputs } from "./types";

export default function Step06Vorhabensbeschreibung() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Vorhabensbeschreibung</h2>
        <p>
          Skizzieren Sie die geplanten Maßnahmen und den methodischen Weg, mit
          dem die gesetzten Ziele realisiert werden sollen.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="vorhabensbeschreibung">
          Vorhabensbeschreibung
        </label>
        <textarea
          class="kern-form-input__input"
          id="vorhabensbeschreibung"
          aria-required="true"
          {...register("vorhabensbeschreibung")}
        />
      </div>

      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Maßnahmen der Zielsetzung</h2>
        <p>
          Skizzieren Sie die geplanten Maßnahmen und den methodischen Weg, mit
          dem die gesetzten Ziele realisiert werden sollen.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="massnahmen">
          Ihre geplanten Maßnahmen
        </label>
        <div class="kern-hint" id="massnahmen-hint">
          Erstellung von Gutachten, internationaler Vergleich/Best Practices
          analysieren, Formate der Beteiligung relevanter Akteure
        </div>
        <textarea
          class="kern-form-input__input"
          id="massnahmen"
          aria-required="true"
          aria-describedby="massnahmen-hint"
          {...register("massnahmen")}
        />
      </div>
    </>
  );
}
