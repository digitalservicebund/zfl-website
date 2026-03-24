import Step01AllgemeineAngaben from "@/pages/steckbrief/_formSteps/Step01AllgemeineAngaben";
import Step02KontextGenese from "@/pages/steckbrief/_formSteps/Step02KontextGenese";
import Step03Problembeschreibung from "@/pages/steckbrief/_formSteps/Step03Problembeschreibung";
import Step04EinflussfaktorenAkteure from "@/pages/steckbrief/_formSteps/Step04EinflussfaktorenAkteure";
import Step05VorlaeufigeZielsetzung from "@/pages/steckbrief/_formSteps/Step05VorlaeufigeZielsetzung";
import Step06Vorhabensbeschreibung from "@/pages/steckbrief/_formSteps/Step06Vorhabensbeschreibung";
import Step08ProjektplanungI from "@/pages/steckbrief/_formSteps/Step08ProjektplanungI";
import Step09ProjektplanungII from "@/pages/steckbrief/_formSteps/Step09ProjektplanungII";
import Step10Zusammenfassung from "@/pages/steckbrief/_formSteps/Step10Zusammenfassung";
import type { Inputs } from "@/pages/steckbrief/_formSteps/types";
import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import { FormProvider, useForm } from "react-hook-form";
import HintSidebar from "./HintSidebar";
import { SidebarContext } from "./SidebarTriggerButton";
import SteckbriefButtonBar from "./SteckbriefButtonBar";

const pageTitles = [
  "1. Allgemeine Angaben",
  "2. Kontext & Genese",
  "3. Problembeschreibung",
  "4. Einflussfaktoren & relevante Akteure",
  "5. Vorläufige Zielsetzung",
  "6. Vorhabensbeschreibung",
  "7. Projektplanung I",
  "8. Projektplanung II",
  "9. Zusammenfassung",
];

export default function SteckbriefForm() {
  const formMethods = useForm<Inputs>();
  const [page, setPage] = useState(1);
  const [hintSidebarContent, setHintSidebarContent] =
    useState<ComponentChildren>(null);
  const isLastPage = page === pageTitles.length;

  const goToPage = (nextPage: number) => {
    setPage(nextPage);
    setHintSidebarContent(null);
  };

  const steps: ComponentChildren[] = [
    <Step01AllgemeineAngaben />,
    <Step02KontextGenese />,
    <Step03Problembeschreibung />,
    <Step04EinflussfaktorenAkteure />,
    <Step05VorlaeufigeZielsetzung />,
    <Step06Vorhabensbeschreibung />,
    // <Step07Visualisierungen />,
    <Step08ProjektplanungI />,
    <Step09ProjektplanungII />,
    <Step10Zusammenfassung goToPage={goToPage} />,
  ];

  return (
    <div className="flex min-h-screen">
      <div className="relative h-[stretch] w-[296px] shrink-0 self-start bg-[#F7F7F9]">
        <nav
          aria-label="Formular-Navigation"
          class="sticky top-0 flex w-full flex-col gap-8 px-16 py-24"
        >
          {pageTitles.map((title, i) => {
            const isActive = page === i + 1;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i + 1)}
                class={`flex w-full items-center gap-2 rounded p-8 text-left transition-colors ${
                  isActive
                    ? "bg-cosmic-blue-base font-semibold text-white"
                    : "bg-transparent text-[#0b0c0c] hover:bg-[#e8e8ee]"
                }`}
              >
                {title}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="w-full">
        <div class="flex min-h-screen flex-col gap-32 lg:flex-row lg:items-stretch">
          <div class="min-w-0 flex-1">
            <div class="py-lg mx-auto max-w-[780px] px-16">
              <div class="kern-progress mb-lg">
                <label class="kern-label" for="progress1">
                  Schritt {page} von {pageTitles.length}
                </label>
                <progress
                  id="progress1"
                  value={page}
                  max={pageTitles.length}
                ></progress>
              </div>
              <SidebarContext.Provider value={setHintSidebarContent}>
                <FormProvider {...formMethods}>
                  <form
                    class="flex flex-col gap-32"
                    novalidate
                    onSubmit={(e) => e.preventDefault()}
                  >
                    {steps[page - 1]}
                  </form>
                </FormProvider>
              </SidebarContext.Provider>
            </div>
          </div>

          <div
            class={`shrink-0 overflow-hidden transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:self-stretch ${
              hintSidebarContent != null
                ? "max-w-full opacity-100 lg:max-w-[360px]"
                : "max-w-0 opacity-0"
            }`}
          >
            <div class="h-full w-full lg:w-[360px]">
              <HintSidebar
                class="h-full"
                onClose={() => setHintSidebarContent(null)}
              >
                {hintSidebarContent}
              </HintSidebar>
            </div>
          </div>
        </div>
        <SteckbriefButtonBar
          page={page}
          isLastPage={isLastPage}
          onPrev={() => setPage(page - 1)}
          onNext={() => setPage(page + 1)}
        />
      </div>
    </div>
  );
}
