import SidebarTriggerButton from "@/pages/steckbrief/_components/SidebarTriggerButton";
import Textarea from "@/pages/steckbrief/_components/Textarea";
import type { Inputs } from "./types";

const sidebarContent = (
  <>
    <h2 class="m-0 text-[21px] font-bold">Leitfragen zum Kontext</h2>
    <ul class="m-0 list-disc pl-27 [&>li]:mb-8 [&>li:last-child]:mb-0">
      <li>
        Welche Ausgangssituation hat den Bedarf für eine Regelung sichtbar
        gemacht?
      </li>
      <li>
        Gab es politische Initiativen, Vereinbarungen, Koalitionsbeschlüsse oder
        externe Impulse?
      </li>
      <li>
        Welche früheren Maßnahmen, Gutachten oder Praxisprobleme haben das Thema
        geprägt?
      </li>
      <li>
        Ist der Handlungsbedarf neu entstanden, oder knüpft das Vorhaben an
        bestehende Prozesse oder Reformen an?
      </li>
      <li>Warum ist gerade jetzt eine Regelung erforderlich?</li>
    </ul>
  </>
);

export default function Step02KontextGenese() {
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">
          Kontext und Genese des Vorhabens
          <SidebarTriggerButton content={sidebarContent} />
        </h2>
        <p>
          Erläutern Sie den Kontext Ihres Vorhabens anhand der maßgeblichen
          Beschlüsse, Vereinbarungen oder politischen Impulse.
        </p>
      </div>

      <Textarea<Inputs> id="kontext" label="Kontext Ihres Vorhabens" />
    </>
  );
}
