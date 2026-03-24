import { useFormContext } from "react-hook-form";
import type { Inputs } from "./types";

export default function Step03Problembeschreibung() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Problembeschreibung</h2>
        <p>
          Beschreiben Sie die aktuelle Sach- und Rechtslage sowie die
          spezifischen Probleme. Begründen Sie hieraus den konkreten
          Handlungsbedarf für das geplante Regelungsvorhaben.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="problembeschreibung">
          Beschreibung des Problems
        </label>
        <textarea
          class="kern-form-input__input"
          id="problembeschreibung"
          aria-required="true"
          {...register("problembeschreibung")}
        />
      </div>
    </>
  );
}
