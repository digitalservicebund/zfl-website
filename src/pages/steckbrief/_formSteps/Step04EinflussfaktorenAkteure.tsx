import SidebarTriggerButton from "@/pages/steckbrief/_components/SidebarTriggerButton";
import Textarea from "@/pages/steckbrief/_components/Textarea";
import type { Inputs } from "./types";

const einflussfaktorenHint = (
  <>
    <h2 class="m-0 text-[21px] font-bold">
      Leitfragen zu den Einflussfaktoren
    </h2>
    <ul class="m-0 list-disc pl-27 [&>li]:mb-8 [&>li:last-child]:mb-0">
      <li>
        Welche politischen Entwicklungen oder Positionen bestimmen den
        Handlungsspielraum?
      </li>
      <li>
        Welche rechtlichen Vorgaben, Pflichten oder Begrenzungen (national/EU)
        sind zu berücksichtigen?
      </li>
      <li>
        Welche technischen Voraussetzungen oder Beschränkungen wirken auf das
        Vorhaben ein?
      </li>
      <li>
        Welche wirtschaftlichen Auswirkungen oder Anreize spielen eine Rolle?
      </li>
      <li>
        Welche sozialen Aspekte oder Betroffenheiten beeinflussen die
        Zielrichtung?
      </li>
      <li>
        Welche ökologischen bzw. nachhaltigkeitsrelevanten Faktoren sind
        betroffen oder müssen eingeplant werden?
      </li>
    </ul>
  </>
);

const akteureHint = (
  <>
    <h2 class="m-0 text-[21px] font-bold">Leitfragen zu den Akteuren</h2>
    <ul class="m-0 list-disc pl-27 [&>li]:mb-8 [&>li:last-child]:mb-0">
      <li>
        Wer ist direkt betroffen (Bürgerinnen und Bürger, Unternehmen,
        Verwaltungseinheiten)?
      </li>
      <li>
        Wer ist mittelbar betroffen (Verbände, Interessenvertretungen,
        Fachgremien)?
      </li>
      <li>
        Welche Ressorts, Behörden oder Ebenen (Bund, Länder, Kommunen) sind
        einzubeziehen?
      </li>
      <li>Wer hat entscheidungsrelevante Kompetenzen oder Vetopositionen?</li>
      <li>
        Wer kann durch Expertise oder Daten einen wesentlichen Beitrag leisten?
      </li>
      <li>
        Bei Priorisierung: Welche Akteure sind für das Gelingen des Vorhabens am
        wichtigsten?
      </li>
    </ul>
  </>
);

export default function Step04EinflussfaktorenAkteure() {
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">
          Einflussfaktoren
          <SidebarTriggerButton content={einflussfaktorenHint} />
        </h2>
        <p>
          Benennen Sie alle maßgeblichen Rahmenbedingungen und Abhängigkeiten,
          die den Erfolg des Vorhabens beeinflussen können.
        </p>
      </div>

      <Textarea<Inputs>
        id="einflussfaktoren"
        label="Einflussfaktoren Ihres Vorhabens"
        hint="Nennen Sie relevante externe Faktoren, rechtliche Rahmenbedingungen oder politische Abhängigkeiten."
      />

      <div class="flex flex-col gap-16">
        <h2 class="mt-0">
          Relevante Akteure
          <SidebarTriggerButton content={akteureHint} />
        </h2>

        <p>
          Führen Sie alle außenstehenden Personen oder Interessengruppen auf,
          die vom Vorhaben betroffen sind oder Einfluss darauf nehmen.
        </p>
      </div>

      <Textarea<Inputs>
        id="relevanteAkteure"
        label="Relevante Akteure Ihres Vorhabens"
      />
    </>
  );
}
