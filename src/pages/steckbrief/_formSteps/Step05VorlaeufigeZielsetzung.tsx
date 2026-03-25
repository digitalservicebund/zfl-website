import SidebarTriggerButton from "@/pages/steckbrief/_components/SidebarTriggerButton";
import { useFormContext } from "react-hook-form";
import type { Inputs } from "./types";

const sidebarContent = (
  <>
    <h2 class="m-0 text-[21px] font-bold">Leitfragen zur Zielsetzung</h2>
    <ul class="m-0 list-disc pl-27 [&>li]:mb-8 [&>li:last-child]:mb-0">
      <li>
        Welche konkrete Verbesserung soll für Bürgerinnen und Bürger,
        Unternehmen oder Verwaltung erreicht werden?
      </li>
      <li>
        Welche unmittelbaren Ergebnisse sollen entstehen (z. B. neue Verfahren,
        klarere Vorgaben, vereinfachte Abläufe)?
      </li>
      <li>
        Welche Wirkungen bei den Betroffenen sollen eintreten (z. B. Entlastung,
        geringerer Aufwand, mehr Transparenz, höhere Rechtssicherheit)?
      </li>
      <li>
        Gibt es bereits eine klare Zielvorstellung – oder handelt es sich noch
        um eine erste, vorläufige Zielskizze?
      </li>
    </ul>
  </>
);

export default function Step05VorlaeufigeZielsetzung() {
  const { register } = useFormContext<Inputs>();
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">
          Vorläufige Zielsetzung
          <SidebarTriggerButton content={sidebarContent} />
        </h2>
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
