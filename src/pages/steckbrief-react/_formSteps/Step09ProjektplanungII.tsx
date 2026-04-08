import SidebarTriggerButton from "../_components/SidebarTriggerButton";
import Textarea from "../_components/Textarea";
import type { Inputs } from "./types";

const zeitHint = (
  <>
    <h2 class="m-0 text-[21px] font-bold">Leitfragen zum Zeithorizont</h2>
    <ul class="m-0 list-disc pl-27 [&>li]:mb-8 [&>li:last-child]:mb-0">
      <li>
        Welche Meilensteine müssen bis zum Inkrafttreten erreicht werden?{" "}
      </li>
      <li>
        Welche externen Faktoren (z. B. Wahlen, Fristen im Bundesrat) könnten
        den Zeitplan verzögern?{" "}
      </li>
    </ul>
  </>
);

const ressourcenHint = (
  <>
    <h2 class="m-0 text-[21px] font-bold">
      Leitfragen zur Ressourcenschätzung
    </h2>
    <ul class="m-0 list-disc pl-27 [&>li]:mb-8 [&>li:last-child]:mb-0">
      <li>
        Reicht die Kapazität im eigenen Referat aus oder benötigen Sie ein
        interdisziplinäres Team?
      </li>
      <li>
        Brauchen Sie externe Unterstützung (z. B. durch die Task Force ZfL oder
        Gutachten)?
      </li>
      <li>
        Wie hoch ist der Koordinationsaufwand mit anderen Ressorts oder
        beteiligten Stellen?
      </li>
      <li>
        Liegen bereits vorhandene Haushaltsmittel vor, oder müssen zusätzliche
        Mittel eingeplant werden?
      </li>
    </ul>
  </>
);

export default function Step09ProjektplanungII() {
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">
          Zeithorizont
          <SidebarTriggerButton content={zeitHint} />
        </h2>
        <p>Beschreiben Sie hier den zeitlichen Ablauf Ihres Vorhabens.</p>
      </div>

      <Textarea<Inputs> id="zeithorizont" label="Zeithorizont des Vorhabens" />

      <div class="flex flex-col gap-16">
        <h2 class="mt-0">
          Ressourcenschätzung
          <SidebarTriggerButton content={ressourcenHint} />
        </h2>
        <p>
          Schätzen Sie hier ein, welche Unterstützung Sie benötigen.
          Berücksichtigen Sie dabei die Komplexität der Arbeitsschritte,
          technische Anforderungen und die Anzahl der beteiligten
          Schnittstellen. Notieren Sie auch, ob Sie zusätzliche Kapazitäten –
          etwa durch ein interdisziplinäres Team oder externe Expertise –
          einplanen müssen.
        </p>
      </div>

      <Textarea<Inputs>
        id="ressourcenschaetzung"
        label="Ressourcenbedarf und -verfügbarkeit"
      />
    </>
  );
}
