import { useState } from "preact/hooks";
import { useFormContext } from "react-hook-form";
import { generateSteckbriefDocx } from "./generateSteckbriefDocx";
import type { Inputs } from "./types";

export default function Step11HerunterladeUndAbsenden() {
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
    <div class="flex flex-col gap-16">
      <h2 class="mt-0">Steckbrief erstellt. So geht es jetzt weiter</h2>
      <div class="kern-task-list">
        <div class="kern-task-list__header">
          <h2 class="kern-heading-medium">Prozess im Überblick</h2>
        </div>

        <ul class="kern-task-list__list">
          <li class="kern-task-list__item">
            <span class="kern-number">1</span>
            <div class="kern-task-list__title" id="task1-title">
              <p class="kern-body mb-0" aria-describedby="task1-status">
                Steckbrief erstellen
              </p>
              <div class="kern-task-list__status" id="task1-status">
                <span class="kern-badge kern-badge--success">
                  <span
                    class="kern-icon kern-icon--success kern-icon--sm"
                    aria-hidden="true"
                  ></span>
                  <span class="kern-label kern-label--small">Erledigt</span>
                </span>
              </div>
            </div>
          </li>
          <li class="kern-task-list__item">
            <span class="kern-number">2</span>
            <div class="kern-task-list__title" id="task2-title">
              <a
                href="#"
                class="kern-link kern-link--stretched"
                aria-describedby="task2-status"
              >
                Mit der Leitungsebene abklären
              </a>
            </div>
          </li>
          <li class="kern-task-list__item">
            <span class="kern-number">2</span>
            <div class="kern-task-list__title" id="task2-title">
              <a
                href="#"
                class="kern-link kern-link--stretched"
                aria-describedby="task2-status"
              >
                Steckbrief versenden an andere Ressorts, ZfL, NKR-S und StaBA
              </a>
            </div>
          </li>
          <li class="kern-task-list__item">
            <span class="kern-number">3</span>
            <div class="kern-task-list__title" id="task3-title">
              <p class="kern-body mb-0">Rückmeldungen sammeln</p>
              <div class="kern-task-list__status" id="task3-status">
                <span class="kern-badge kern-badge--info">
                  <span class="kern-label kern-label--small">
                    Noch nicht zu bearbeiten
                  </span>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <h2>Schritt für Schritt</h2>
      <div class="flex gap-32 bg-[#F7F7F9] p-32">
        <div class="bg-lavender-base text-cosmic-blue-400 flex w-[170px] shrink-0 items-center justify-center rounded-sm p-22">
          <svg
            width="99"
            height="99"
            viewBox="0 0 99 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.3"
              d="M58.4513 45.375H53.6251V20.625H45.3751V45.375H40.5488L49.5001 54.3263L58.4513 45.375Z"
              fill="currentColor"
            />
            <path
              d="M78.375 74.25H20.625V82.5H78.375V74.25Z"
              fill="currentColor"
            />
            <path
              d="M78.375 37.125H61.875V12.375H37.125V37.125H20.625L49.5 66L78.375 37.125ZM45.375 45.375V20.625H53.625V45.375H58.4513L49.5 54.3263L40.5487 45.375H45.375Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div>
          <h3>Steckbrief herunterladen</h3>
          <p>
            Laden Sie den aktuellen Stand Ihres Steckbriefs als Word-Dokument
            herunter.
          </p>
          <button
            type="button"
            class="kern-btn kern-btn--primary mt-14"
            onClick={handleDownload}
            disabled={isGenerating}
          >
            <span class="kern-label">
              {isGenerating ? "Wird erstellt…" : "Steckbrief herunterladen"}
            </span>
          </button>
        </div>
      </div>
      <h3>Mit der Leitungsebene abklären</h3>
      <p>
        Stimmen Sie den Steckbrief mit Ihrem Referat und der Referatsleitung ab.
      </p>
      <h3>Steckbrief versenden</h3>
      <p>
        Vervollständigen Sie fehlende Angaben. Sobald das Dokument bereit ist,
        können Sie es direkt an die beteiligten Ressorts, Statistisches
        Bundesamt (Destatis) und den Nationaler Normenkontrollrat (NKR) per
        E-Mail übermitteln.
      </p>
      <p>
        Wenn Sie bereits <strong>Visualisierungen</strong> erstellt haben,
        können Sie diese als Anhang mitschicken.
      </p>
      <div class="kern-form-input max-w-[422px]">
        <label class="kern-label" for="select">
          Empfänger auswählen
        </label>
        <div class="kern-form-input__select-wrapper">
          <select class="kern-form-input__select" id="select">
            <option>Bitte auswählen</option>
          </select>
        </div>
      </div>
      <div class="mt-32">
        <button class="kern-btn kern-btn--secondary">
          <span class="kern-label">E-Mail erstellen</span>
        </button>
      </div>
    </div>
  );
}
