import { useFormContext } from "react-hook-form";
import type { Inputs } from "./types";

export default function Step05VorlaeufigeZielsetzung() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Vorläufige Zielsetzung</h2>
        <p>
          Definieren Sie den angestrebten Endzustand sowie den messbaren Nutzen,
          der durch dieses Vorhaben erreicht werden soll.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="zielsetzung">
          Zielsetzung des Vorhabens
        </label>
        <textarea
          class="kern-form-input__input"
          id="zielsetzung"
          aria-required="true"
          {...register("zielsetzung")}
        />
      </div>
    </>
  );
}
