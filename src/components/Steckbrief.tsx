import { useState } from "preact/hooks";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

type Inputs = {
  arbeitstitel: string;
  aktenzeichen: string;
  ressort: string;
  referat: string;
  name: string;
  email: string;
  telefonnummer: string;
};

export default function SteckbriefForm() {
  const formMethods = useForm<Inputs>();
  const [page, setPage] = useState(1);

  return (
    <div class="max-w-a11y">
      <div class="kern-progress">
        <label class="kern-label" for="progress1">
          Schritt 1 von 5
        </label>
        <progress id="progress1" value="1" max="5"></progress>
      </div>
      <FormProvider {...formMethods}>
        <form class="flex flex-col gap-32" novalidate>
          {page == 1 && <FormPage1></FormPage1>}
          <div class="flex gap-16">
            <button
              type="button"
              class="kern-btn kern-btn--secondary"
              onClick={() => setPage(1)}
            >
              <span class="kern-label">Zurück</span>
            </button>
            <button
              type="submit"
              class="kern-btn kern-btn--primary"
              onClick={() => setPage(1)}
            >
              <span class="kern-label">Weiter</span>
              <span
                class="kern-icon kern-icon--arrow-forward"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

function FormPage1() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-32">
        <div class="flex flex-col gap-16">
          <p class="kern-label">Kontaktinformationen</p>
          <h2 class="mt-0">Allgemeine Angaben</h2>
          <p>Bitte geben Sie die allgemeinen Angaben zu Ihrem Vorhaben ein.</p>
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
            {...register("arbeitstitel")}
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
            aria-describedby="aktenzeichen-hint"
            {...register("aktenzeichen")}
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
              {...register("ressort")}
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
              {...register("referat")}
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-32">
        <div class="flex flex-col gap-16">
          <p class="kern-label">Kontaktinformationen</p>
          <h2 class="mt-0">Kontaktdaten</h2>
          <p>
            Bitte geben Sie Ihre Kontaktdaten für Rückfragen zu diesem Vorhaben
            ein.
          </p>
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
            {...register("name")}
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
              {...register("email")}
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
              {...register("telefonnummer")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
