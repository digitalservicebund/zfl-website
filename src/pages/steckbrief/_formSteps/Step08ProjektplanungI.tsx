import SidebarTriggerButton from "@/pages/steckbrief/_components/SidebarTriggerButton";
import { useFormContext } from "react-hook-form";
import type { Inputs } from "./types";

const risikoHint = (
  <>
    <h2 class="m-0 text-[21px] font-bold">Leitfragen zur Risikoeinschätzung</h2>
    <ul class="m-0 list-disc pl-27 [&>li]:mb-8 [&>li:last-child]:mb-0">
      <li>
        Welche unbeabsichtigten Nebenfolgen (z. B. hohe Bürokratiekosten)
        könnten entstehen?
      </li>
      <li>
        Gibt es politische Risiken oder Akteure, die das Vorhaben blockieren
        könnten?
      </li>
      <li>
        Wie wahrscheinlich sind diese Hindernisse und wie stark würden sie den
        Zeitplan verzögern?
      </li>
    </ul>
  </>
);

const komplexitaetHint = (
  <>
    <h2 class="m-0 text-[21px] font-bold">Leitfragen zum Komplexitätsgrad</h2>
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

export default function Step08ProjektplanungI() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">
          Risikoeinschätzung
          <SidebarTriggerButton content={risikoHint} />
        </h2>
        <p>
          Benennen Sie potenzielle Hindernisse für Ihr Vorhaben. Nennen Sie auch
          deren Eintrittswahrscheinlichkeit.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="risikoeinschaetzung">
          Risikobetrachtung
        </label>
        <textarea
          class="kern-form-input__input"
          id="risikoeinschaetzung"
          aria-required="true"
          {...register("risikoeinschaetzung")}
        />
      </div>

      <div class="flex flex-col gap-16">
        <h2 class="mt-0">
          Komplexitätsgrad des Vorhabens
          <SidebarTriggerButton content={komplexitaetHint} />
        </h2>
        <p>
          Beurteilen Sie den Schwierigkeitsgrad des Vorhabens anhand der Anzahl
          der beteiligten Schnittstellen, der technischen Anforderungen und der
          Verflechtung einzelner Arbeitsschritte.
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="komplexitaetsgrad">
          Komplexität des Vorhabens
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
