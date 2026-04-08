import { useFormContext } from "react-hook-form";
import type { Inputs } from "./types";
import { validationRules } from "./validationRules";

export default function Step01AllgemeineAngaben() {
  const { register } = useFormContext<Inputs>();

  return (
    <>
      <div class="flex flex-col gap-32">
        <div class="flex flex-col gap-16">
          <h2 class="mt-0">Allgemeine Angaben</h2>
        </div>

        <div class="kern-form-input">
          <label class="kern-label" for="arbeitstitel">
            Arbeitstitel des Vorhabens
          </label>
          <input
            class="kern-form-input__input"
            id="arbeitstitel"
            type="text"
            aria-required="true"
            {...register("arbeitstitel", validationRules.requiredShortText)}
          />
        </div>

        <div class="kern-form-input">
          <label class="kern-label" for="aktenzeichen">
            Aktenzeichen
          </label>
          <div class="kern-hint" id="aktenzeichen-hint">
            Falls unklar, vorläufige Kennung eintragen
          </div>
          <input
            class="kern-form-input__input"
            id="aktenzeichen"
            type="text"
            aria-required="true"
            aria-describedby="aktenzeichen-hint"
            {...register("aktenzeichen", validationRules.required)}
          />
        </div>

        <div class="flex gap-32">
          <div class="kern-form-input flex-1">
            <label class="kern-label" for="ressort">
              Federführendes Ressort
            </label>
            <input
              class="kern-form-input__input"
              id="ressort"
              type="text"
              aria-required="true"
              {...register("ressort", validationRules.required)}
            />
          </div>
          <div class="kern-form-input flex-1">
            <label class="kern-label" for="referat">
              Referat
            </label>
            <input
              class="kern-form-input__input"
              id="referat"
              type="text"
              aria-required="true"
              {...register("referat", validationRules.required)}
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-32">
        <div class="flex flex-col gap-16">
          <h2 class="mt-0">Kontaktdaten</h2>
          <p>Bitte geben Sie Ihre Kontaktdaten ein.</p>
        </div>

        <div class="kern-form-input">
          <label class="kern-label" for="name">
            Ihr Name
          </label>
          <input
            class="kern-form-input__input"
            id="name"
            type="text"
            aria-required="true"
            {...register("name", validationRules.required)}
          />
        </div>

        <div class="flex gap-32">
          <div class="kern-form-input flex-1">
            <label class="kern-label" for="email">
              Ihre E-Mail Adresse
            </label>
            <input
              class="kern-form-input__input"
              id="email"
              type="email"
              aria-required="true"
              {...register("email", validationRules.requiredEmail)}
            />
          </div>
          <div class="kern-form-input flex-1">
            <label class="kern-label" for="telefon">
              Ihre Telefonnummer
            </label>
            <input
              class="kern-form-input__input"
              id="telefon"
              type="tel"
              aria-required="true"
              {...register("telefonnummer", validationRules.required)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
