import SidebarTriggerButton from "@/pages/steckbrief/_components/SidebarTriggerButton";
import Textarea from "@/pages/steckbrief/_components/Textarea";
import type { Inputs } from "./types";

const vorhabenHint = (
  <>
    <h2 class="m-0 text-[21px] font-bold">
      Leitfragen zur Vorhabensbeschreibung
    </h2>
    <ul class="m-0 list-disc pl-27 [&>li]:mb-8 [&>li:last-child]:mb-0">
      <li>
        Welche Arbeitsschritte sind vorgesehen (z. B. Auswertung vorhandener
        Erkenntnisse, Erarbeitung erster Lösungsansätze)?
      </li>
      <li>
        Welche Untersuchungen oder Fachgutachten sollen erstellt oder
        herangezogen werden?
      </li>
      <li>
        Ist ein Vergleich mit anderen Staaten geplant, um bewährte Ansätze oder
        Alternativen zu prüfen?
      </li>
      <li>
        Welche Beteiligungsformate sind vorgesehen (z. B. Einbindung von
        Fachkreisen, Verbänden, Verwaltungspraxis)?
      </li>
      <li>
        Wie sollen betroffene Akteure oder die Öffentlichkeit informiert oder
        einbezogen werden?
      </li>
      <li>
        Gibt es geplante Erprobungen, Rückkopplungsschleifen oder Abstimmungen
        zwischen Ressorts?
      </li>
    </ul>
  </>
);

const massnahmenHint = (
  <>
    <h2 class="m-0 text-[21px] font-bold">Leitfragen zu den Maßnahmen</h2>
    <ul class="m-0 list-disc pl-27 [&>li]:mb-8 [&>li:last-child]:mb-0">
      <li>
        Welche Maßnahmen müssen zuerst abgeschlossen sein, damit weitere
        Schritte beginnen können?
      </li>
      <li>
        Welche Maßnahmen benötigen eine enge Abstimmung mit anderen Ressorts
        oder Akteuren?
      </li>
      <li>
        Gibt es Maßnahmen, die bereits fest terminiert sind oder aus politischen
        Vorgaben resultieren?
      </li>
    </ul>
  </>
);

export default function Step06Vorhabensbeschreibung() {
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">
          Vorhabensbeschreibung
          <SidebarTriggerButton content={vorhabenHint} />
        </h2>
        <p>
          Skizzieren Sie die geplanten Maßnahmen und den methodischen Weg, mit
          dem die gesetzten Ziele realisiert werden sollen.
        </p>
      </div>

      <Textarea<Inputs>
        id="vorhabensbeschreibung"
        label="Vorhabensbeschreibung"
      />

      <div class="flex flex-col gap-16">
        <h2 class="mt-0">
          Maßnahmen der Zielsetzung
          <SidebarTriggerButton content={massnahmenHint} />
        </h2>
        <p>
          Skizzieren Sie die geplanten Maßnahmen und den methodischen Weg, mit
          dem die gesetzten Ziele realisiert werden sollen.
        </p>
      </div>

      <Textarea<Inputs>
        id="massnahmen"
        label="Ihre geplanten Maßnahmen"
        hint="Erstellung von Gutachten, internationaler Vergleich/Best Practices analysieren, Formate der Beteiligung relevanter Akteure"
      />
    </>
  );
}
