import { useState } from "preact/hooks";
import { useFormContext } from "react-hook-form";
import { generateSteckbriefDocx } from "../_formSteps/generateSteckbriefDocx";
import type { Inputs } from "../_formSteps/types";

const defaultText = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      class="mr-8 inline-block shrink-0"
    >
      <path
        fill="currentColor"
        d="m17.66 9.53l-7.07 7.07l-4.24-4.24l1.41-1.41l2.83 2.83l5.66-5.66zM4 12c0-2.33 1.02-4.42 2.62-5.88L9 8.5v-6H3l2.2 2.2C3.24 6.52 2 9.11 2 12c0 5.19 3.95 9.45 9 9.95v-2.02c-3.94-.49-7-3.86-7-7.93m18 0c0-5.19-3.95-9.45-9-9.95v2.02c3.94.49 7 3.86 7 7.93c0 2.33-1.02 4.42-2.62 5.88L15 15.5v6h6l-2.2-2.2c1.96-1.82 3.2-4.41 3.2-7.3"
      />
    </svg>{" "}
    Ihre Daten werden automatisch im Browser gespeichert.
  </>
);

const lastPageText = (
  <>
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      class="mr-8 inline-block shrink-0"
    >
      <path
        d="M10.083 6.41671H11.9163V8.25004H10.083V6.41671ZM10.083 10.0834H11.9163V15.5834H10.083V10.0834ZM10.9997 1.83337C5.93967 1.83337 1.83301 5.94004 1.83301 11C1.83301 16.06 5.93967 20.1667 10.9997 20.1667C16.0597 20.1667 20.1663 16.06 20.1663 11C20.1663 5.94004 16.0597 1.83337 10.9997 1.83337ZM10.9997 18.3334C6.95717 18.3334 3.66634 15.0425 3.66634 11C3.66634 6.95754 6.95717 3.66671 10.9997 3.66671C15.0422 3.66671 18.333 6.95754 18.333 11C18.333 15.0425 15.0422 18.3334 10.9997 18.3334Z"
        fill="currentColor"
      />
    </svg>{" "}
    Wenn Sie auf Weiter klicken, gelangen Sie zur Phase II der Frühphase
  </>
);

interface Props {
  page: number;
  isLastPage: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export default function SteckbriefButtonBar({
  page,
  isLastPage,
  onPrev,
  onNext,
}: Props) {
  const { getValues } = useFormContext<Inputs>();
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownload() {
    setIsGenerating(true);
    try {
      await generateSteckbriefDocx(getValues());
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div class="sticky bottom-0 z-10 border-t border-[#A5AAC3] bg-white py-16">
      <div class="flex w-full items-center justify-between gap-16 px-64">
        <div class="kern-body kern-body--muted">
          {isLastPage ? lastPageText : defaultText}
        </div>
        <div class="flex gap-16">
          <button
            type="button"
            class="kern-btn kern-btn--tertiary"
            onClick={handleDownload}
            disabled={isGenerating}
          >
            <span
              class="kern-icon kern-icon--download kern-icon--default"
              aria-hidden="true"
            ></span>
            <span class="kern-label">
              {isGenerating ? "Wird erstellt…" : "Zwischenstand herunterladen"}
            </span>
          </button>
          {page > 1 && (
            <button
              type="button"
              class="kern-btn kern-btn--secondary"
              onClick={onPrev}
            >
              <span class="kern-label">Zurück</span>
            </button>
          )}
          {isLastPage ? (
            <button
              type="submit"
              form="steckbrief-form"
              class="kern-btn kern-btn--primary"
            >
              <span class="kern-label">Weiter</span>
            </button>
          ) : (
            <button
              type="button"
              class="kern-btn kern-btn--primary"
              onClick={onNext}
            >
              <span class="kern-label">Weiter</span>
              <span
                class="kern-icon kern-icon--arrow-forward"
                aria-hidden="true"
              ></span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
