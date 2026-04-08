import { useState } from "preact/hooks";
import { useFormContext } from "react-hook-form";
import type { Inputs } from "./types";

const TRUNCATE_AT = 500;

function TruncatedValue({ value }: { value: string }) {
  const [expanded, setExpanded] = useState(false);
  const isTruncatable = value.length > TRUNCATE_AT;

  const displayValue =
    isTruncatable && !expanded ? value.slice(0, TRUNCATE_AT) : value;

  return (
    <span>
      <span style={{ whiteSpace: "pre-wrap" }}>{displayValue}</span>
      {isTruncatable && !expanded && "..."}
      {isTruncatable && (
        <>
          {" "}
          <button
            type="button"
            class="kern-link"
            style={{ display: "inline", padding: 0, fontSize: "inherit" }}
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "[einklappen]" : "[ausklappen]"}
          </button>
        </>
      )}
    </span>
  );
}

type SummaryCardProps = {
  title: string;
  pageNumber: number;
  items: { key: string; value: string }[];
  goToPage: (page: number) => void;
};

function SummaryCard({ title, pageNumber, items, goToPage }: SummaryCardProps) {
  return (
    <div class="kern-summary">
      <div class="kern-summary__header">
        <p class="kern-title">{title}</p>
      </div>
      <div class="kern-summary__body">
        <dl class="kern-description-list">
          {items.map(({ key, value }) => {
            const strValue = value?.toString();
            return (
              <div class="kern-description-list-item">
                <dt class="kern-description-list-item__key">{key}</dt>
                <dd class="kern-description-list-item__value">
                  {strValue ? <TruncatedValue value={strValue} /> : "–"}
                </dd>
              </div>
            );
          })}
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

export default function Step10Zusammenfassung({
  goToPage,
}: {
  goToPage: (page: number) => void;
  isWide?: boolean;
}) {
  const { watch } = useFormContext<Inputs>();
  const values = watch();

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
          goToPage={goToPage}
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
          goToPage={goToPage}
          items={[
            { key: "Name", value: values.name },
            { key: "E-Mail Adresse", value: values.email },
            { key: "Telefonnummer", value: values.telefonnummer },
          ]}
        />
        <SummaryCard
          title="Kontext und Genese"
          pageNumber={2}
          goToPage={goToPage}
          items={[{ key: "Kontext", value: values.kontext }]}
        />
        <SummaryCard
          title="Problembeschreibung"
          pageNumber={3}
          goToPage={goToPage}
          items={[
            { key: "Problembeschreibung", value: values.problembeschreibung },
          ]}
        />
        <SummaryCard
          title="Einflussfaktoren & Akteure"
          pageNumber={4}
          goToPage={goToPage}
          items={[
            { key: "Einflussfaktoren", value: values.einflussfaktoren },
            { key: "Relevante Akteure", value: values.relevanteAkteure },
          ]}
        />
        <SummaryCard
          title="Vorläufige Zielsetzung"
          pageNumber={5}
          goToPage={goToPage}
          items={[{ key: "Zielsetzung", value: values.zielsetzung }]}
        />
        <SummaryCard
          title="Vorhabensbeschreibung"
          pageNumber={6}
          goToPage={goToPage}
          items={[
            {
              key: "Vorhabensbeschreibung",
              value: values.vorhabensbeschreibung,
            },
            { key: "Wichtige Maßnahmen", value: values.massnahmen },
          ]}
        />
        <SummaryCard
          title="Projektplanung I"
          pageNumber={8}
          goToPage={goToPage}
          items={[
            { key: "Zeithorizont", value: values.zeithorizont },
            { key: "Ressourcenschätzung", value: values.ressourcenschaetzung },
          ]}
        />
        <SummaryCard
          title="Projektplanung II"
          pageNumber={9}
          goToPage={goToPage}
          items={[
            { key: "Risikoeinschätzung", value: values.risikoeinschaetzung },
            { key: "Komplexitätsgrad", value: values.komplexitaetsgrad },
          ]}
        />
      </div>
    </>
  );
}
