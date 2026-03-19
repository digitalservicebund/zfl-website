import type { ComponentChildren } from "preact";
import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

const NavigationContext = createContext<(page: number) => void>(() => {});

type PageDef = {
  title: string;
  component: ComponentChildren;
};

const pages: PageDef[] = [
  {
    title: "Allgemeine Angaben",
    component: <FormPage1 />,
  },
  {
    title: "Kontext & Genese",
    component: <FormPage2 />,
  },
  {
    title: "Problembeschreibung",
    component: <FormPage3 />,
  },
  {
    title: "Einflussfaktoren & relevante Akteure",
    component: <FormPage4 />,
  },
  {
    title: "Vorläufige Zielsetzung",
    component: <FormPage5 />,
  },
  {
    title: "Vorhabensbeschreibung",
    component: <FormPage6 />,
  },
  {
    title: "Visualisierungen",
    component: <FormPage7 />,
  },
  {
    title: "Projektplanung I",
    component: <FormPage8 />,
  },
  {
    title: "Projektplanung II",
    component: <FormPage9 />,
  },
  {
    title: "Zusammenfassung",
    component: <FormPage10 />,
  },
];

type Inputs = {
  arbeitstitel: string;
  aktenzeichen: string;
  ressort: string;
  referat: string;
  name: string;
  email: string;
  telefonnummer: string;
  kontext: string;
  problembeschreibung: string;
  einflussfaktoren: string;
  relevanteAkteure: string;
  zielsetzung: string;
  vorhabensbeschreibung: string;
  massnahmen: string;
  visualisierungen: FileList;
  zeithorizont: string;
  ressourcenschaetzung: string;
  risikoeinschaetzung: string;
  komplexitaetsgrad: string;
};

export default function SteckbriefForm() {
  const formMethods = useForm<Inputs>();
  const [page, setPage] = useState(1);
  const isLastPage = page === pages.length;

  return (
    <div className="flex min-h-screen">
      <div className="relative h-[stretch] w-[296px] shrink-0 self-start bg-[#F7F7F9]">
        <nav
          aria-label="Formular-Navigation"
          class="sticky top-0 flex w-full flex-col gap-8 px-16 py-24"
        >
          {pages.map((p, i) => {
            const isActive = page === i + 1;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i + 1)}
                class={`flex w-full items-center gap-2 rounded p-8 text-left transition-colors ${
                  isActive
                    ? "bg-cosmic-blue-base font-semibold text-white"
                    : "bg-transparent text-[#0b0c0c] hover:bg-[#e8e8ee]"
                }`}
              >
                {p.title}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="py-lg w-full">
        <div class="max-w-a11y mx-auto">
          <div class="kern-progress mb-lg">
            <label class="kern-label" for="progress1">
              Schritt {page} von {pages.length}
            </label>
            <progress id="progress1" value={page} max={pages.length}></progress>
          </div>
          <NavigationContext.Provider value={setPage}>
            <FormProvider {...formMethods}>
              <form
                class="flex flex-col gap-32"
                novalidate
                onSubmit={(e) => e.preventDefault()}
              >
                {pages[page - 1].component}
                <div class="flex gap-16">
                  {page > 1 && (
                    <button
                      type="button"
                      class="kern-btn kern-btn--secondary"
                      onClick={() => setPage(page - 1)}
                    >
                      <span class="kern-label">Zurück</span>
                    </button>
                  )}
                  {isLastPage ? (
                    <button type="submit" class="kern-btn kern-btn--primary">
                      <span class="kern-label">Absenden</span>
                      <span
                        class="kern-icon kern-icon--arrow-forward"
                        aria-hidden="true"
                      ></span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      class="kern-btn kern-btn--primary"
                      onClick={() => setPage(page + 1)}
                    >
                      <span class="kern-label">Weiter</span>
                      <span
                        class="kern-icon kern-icon--arrow-forward"
                        aria-hidden="true"
                      ></span>
                    </button>
                  )}
                </div>
              </form>
            </FormProvider>
          </NavigationContext.Provider>
        </div>
      </div>
    </div>
  );
}

function FormPage1() {
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

function FormPage2() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Kontext und Genese des Vorhabens</h2>
        <p>
          Erläutern Sie den Kontext Ihres Vorhabens anhand der maßgeblichen
          Beschlüsse, Vereinbarungen oder politischen Impulse.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="kontext">
          Kontext Ihres Vorhabens
        </label>
        <div class="kern-hint" id="kontext-hint">
          Beschreiben Sie die Ausgangssituation und den Hintergrund des
          Vorhabens.
        </div>
        <textarea
          class="kern-form-input__input"
          id="kontext"
          aria-required="true"
          aria-describedby="kontext-hint"
          {...register("kontext")}
        />
      </div>

      <ul>
        <li>
          Welche Ausgangssituation hat den Bedarf für eine Regelung sichtbar
          gemacht?
        </li>
        <li>
          Gab es politische Initiativen, Vereinbarungen, Koalitionsbeschlüsse
          oder externe Impulse?
        </li>
        <li>
          Welche früheren Maßnahmen, Gutachten oder Praxisprobleme haben das
          Thema geprägt?
        </li>
        <li>
          Ist der Handlungsbedarf neu entstanden, oder knüpft das Vorhaben an
          bestehende Prozesse oder Reformen an?
        </li>
        <li>Warum ist gerade jetzt eine Regelung erforderlich?</li>
      </ul>
    </>
  );
}

function FormPage3() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Problembeschreibung</h2>
        <p>
          Erläutern Sie den aktuellen Ist-Zustand sowie die spezifische
          Herausforderung und den daraus resultierenden Handlungsbedarf.
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

function FormPage4() {
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

function FormPage5() {
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

function FormPage6() {
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
        <h2 class="mt-0">Wichtige Maßnahmen</h2>
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

function FormPage7() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Visualisierungen</h2>
        <p>
          Falls vorhanden: hängen Sie Visualisierungen an, die im Kontext des
          Vorhabens relevant sind z.B. Mind Map, Stakeholdermap,
          „RegulierungsMapping", Projektplan
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="visualisierungen">
          Visualisierungen hochladen{" "}
          <span class="kern-label__optional">- Optional</span>
        </label>
        <div class="kern-hint" id="visualisierungen-hint">
          Erlaubte Formate: JPG, PNG, PDF.
        </div>
        <input
          class="kern-form-input__input"
          id="visualisierungen"
          type="file"
          multiple
          aria-describedby="visualisierungen-hint"
          {...register("visualisierungen")}
        />
      </div>
    </>
  );
}

function FormPage8() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Zeithorizont</h2>
        <p>
          Identifizieren Sie potenzielle Gefahren für die Zielsetzung des
          Vorhabens und bewerten Sie deren Eintrittswahrscheinlichkeit sowie die
          möglichen Auswirkungen.
        </p>
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
          Beurteilen Sie den Schwierigkeitsgrad des Vorhabens anhand der Anzahl
          der beteiligten Schnittstellen, der technischen Anforderungen und der
          Verflechtung einzelner Arbeitsschritte. Geben Sie zudem eine
          Einschätzung zum Zeithorizont und der Ressourcenschätzung an.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="ressourcenschaetzung">
          Ressourcenschätzung des Vorhabens
        </label>
        <div class="kern-hint" id="ressourcenschaetzung-hint">
          Erstellung von Gutachten, internationaler Vergleich/Best Practices
          analysieren, Formate der Beteiligung relevanter Akteure
        </div>
        <textarea
          class="kern-form-input__input"
          id="ressourcenschaetzung"
          aria-required="true"
          aria-describedby="ressourcenschaetzung-hint"
          {...register("ressourcenschaetzung")}
        />
      </div>
    </>
  );
}

function FormPage9() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Risikoeinschätzung</h2>
        <p>
          Identifizieren Sie potenzielle Gefahren für die Zielsetzung des
          Vorhabens und bewerten Sie deren Eintrittswahrscheinlichkeit sowie die
          möglichen Auswirkungen.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="risikoeinschaetzung">
          Risikoeinschätzung des Vorhabens
        </label>
        <textarea
          class="kern-form-input__input"
          id="risikoeinschaetzung"
          aria-required="true"
          {...register("risikoeinschaetzung")}
        />
      </div>

      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Komplexitätsgrad</h2>
        <p>
          Beurteilen Sie den Schwierigkeitsgrad des Vorhabens anhand der Anzahl
          der beteiligten Schnittstellen, der technischen Anforderungen und der
          Verflechtung einzelner Arbeitsschritte. Geben Sie zudem eine
          Einschätzung zum Zeithorizont und der Ressourcenschätzung an.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="komplexitaetsgrad">
          Komplexitätsgrad des Vorhabens
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

type SummaryCardProps = {
  title: string;
  pageNumber: number;
  items: { key: string; value: string }[];
};

function SummaryCard({ title, pageNumber, items }: SummaryCardProps) {
  const goToPage = useContext(NavigationContext);
  return (
    <div class="kern-summary">
      <div class="kern-summary__header">
        <p class="kern-title">{title}</p>
      </div>
      <div class="kern-summary__body">
        <dl class="kern-description-list">
          {items.map(({ key, value }) => (
            <div class="kern-description-list-item">
              <dt class="kern-description-list-item__key">{key}</dt>
              <dd class="kern-description-list-item__value">{value || "–"}</dd>
            </div>
          ))}
        </dl>
        <div>
          <button
            type="button"
            class="kern-link"
            onClick={() => goToPage(pageNumber)}
          >
            <span class="kern-icon kern-icon--edit" aria-hidden="true"></span>
            Bearbeiten
          </button>
        </div>
      </div>
    </div>
  );
}

function FormPage10() {
  const { watch } = useFormContext<Inputs>();
  const values = watch();

  const fileNames = values.visualisierungen?.length
    ? Array.from(values.visualisierungen)
        .map((f) => f.name)
        .join(", ")
    : "Keine Dateien hochgeladen";

  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Zusammenfassung</h2>
        <p>
          Überprüfen Sie Ihre Angaben und korrigieren Sie diese, falls
          notwendig.
        </p>
      </div>

      <div class="flex flex-col">
        <SummaryCard
          title="Allgemeine Angaben"
          pageNumber={1}
          items={[
            { key: "Arbeitstitel des Vorhabens", value: values.arbeitstitel },
            { key: "Aktenzeichen", value: values.aktenzeichen },
            { key: "Federführendes Ressort", value: values.ressort },
            { key: "Referat", value: values.referat },
          ]}
        />
        <SummaryCard
          title="Kontaktdaten"
          pageNumber={1}
          items={[
            { key: "Name", value: values.name },
            { key: "E-Mail Adresse", value: values.email },
            { key: "Telefonnummer", value: values.telefonnummer },
          ]}
        />
        <SummaryCard
          title="Kontext und Genese"
          pageNumber={2}
          items={[{ key: "Kontext", value: values.kontext }]}
        />
        <SummaryCard
          title="Problembeschreibung"
          pageNumber={3}
          items={[
            { key: "Problembeschreibung", value: values.problembeschreibung },
          ]}
        />
        <SummaryCard
          title="Einflussfaktoren & Akteure"
          pageNumber={4}
          items={[
            { key: "Einflussfaktoren", value: values.einflussfaktoren },
            { key: "Relevante Akteure", value: values.relevanteAkteure },
          ]}
        />
        <SummaryCard
          title="Vorläufige Zielsetzung"
          pageNumber={5}
          items={[{ key: "Zielsetzung", value: values.zielsetzung }]}
        />
        <SummaryCard
          title="Vorhabensbeschreibung"
          pageNumber={6}
          items={[
            {
              key: "Vorhabensbeschreibung",
              value: values.vorhabensbeschreibung,
            },
            { key: "Wichtige Maßnahmen", value: values.massnahmen },
          ]}
        />
        <SummaryCard
          title="Visualisierungen"
          pageNumber={7}
          items={[{ key: "Hochgeladene Dateien", value: fileNames }]}
        />
        <SummaryCard
          title="Projektplanung I"
          pageNumber={8}
          items={[
            { key: "Zeithorizont", value: values.zeithorizont },
            { key: "Ressourcenschätzung", value: values.ressourcenschaetzung },
          ]}
        />
        <SummaryCard
          title="Projektplanung II"
          pageNumber={9}
          items={[
            { key: "Risikoeinschätzung", value: values.risikoeinschaetzung },
            { key: "Komplexitätsgrad", value: values.komplexitaetsgrad },
          ]}
        />
      </div>
    </>
  );
}
