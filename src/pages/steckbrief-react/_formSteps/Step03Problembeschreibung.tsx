import SidebarTriggerButton from "@/pages/steckbrief/_components/SidebarTriggerButton";
import Textarea from "@/pages/steckbrief/_components/Textarea";
import type { Inputs } from "./types";

const sidebarContent = (
  <>
    <h2 class="m-0 text-[21px] font-bold">
      Leitfragen zur Problembeschreibung
    </h2>
    <ul class="m-0 list-disc pl-27 [&>li]:mb-8 [&>li:last-child]:mb-0">
      <li>
        Woraus ergibt sich das Problem: aus bestehenden Regelungen, fehlenden
        Regelungen oder ihrer Anwendung?
      </li>
      <li>
        Warum kann das Problem nicht mit vorhandenen Regelungen gelöst werden?
      </li>
      <li>
        Welche Folgen treten ein, wenn das Problem nicht adressiert wird (z.B.
        Aufwand, Risiken, Ineffizienzen)?
      </li>
      <li>
        Wie zeigt sich das Problem in der Praxis – und was davon ist Symptom,
        was Ursache?
      </li>
    </ul>
  </>
);

export default function Step03Problembeschreibung() {
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">
          Problembeschreibung
          <SidebarTriggerButton content={sidebarContent} />
        </h2>
        <p>
          Beschreiben Sie die aktuelle Sach- und Rechtslage sowie die
          spezifischen Probleme. Begründen Sie hieraus den konkreten
          Handlungsbedarf für das geplante Regelungsvorhaben.
        </p>
      </div>

      <Textarea<Inputs>
        id="problembeschreibung"
        label="Beschreibung des Problems"
      />
    </>
  );
}
