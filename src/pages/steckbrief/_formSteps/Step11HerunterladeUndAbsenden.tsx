export default function Step11HerunterladeUndAbsenden() {
  return (
    <div class="flex flex-col gap-16">
      <h2 class="mt-0">Steckbrief herunterladen</h2>
      <p>
        Das Word-Dokument ermöglicht Ihnen eine unkomplizierte interne
        Abstimmung in Ihrem Referat. Ergänzen Sie fehlende Informationen und
        stimmen Sie sich ebenfalls mit den beteiligten Ressorts ab, um den
        Steckbrief zu vervollständigen.
      </p>
      <div>
        <button class="kern-btn kern-btn--primary">
          <span class="kern-label">Steckbrief herunterladen</span>
        </button>
      </div>
      <hr class="kern-divider my-md" aria-hidden="true" />
      <h2 class="mt-0">Absenden</h2>
      <div class="space-y-32">
        <p>
          Sobald Ihr Steckbrief vollständig ist, senden Sie ihn zur Information
          an den Normenkontrollrat und Destatis. Wählen Sie Ihre Empfänger aus
          der Liste aus:
        </p>
        <div
          class="kern-alert kern-alert--info border-cosmic-blue-400"
          role="alert"
        >
          <div class="kern-alert__header bg-cosmic-blue-100">
            <span
              class="kern-icon kern-icon--info bg-cosmic-blue-400"
              aria-hidden="true"
            ></span>
            <span class="kern-title">
              Wenn Sie bereits relevante Visualisierungen erstellt haben
            </span>
          </div>
          <div class="kern-alert__body">
            <p class="kern-body">
              Schicken Sie diese im letzten Schritt als Anhang zum Steckbrief an
              die beteiligten Ressorts.{" "}
            </p>
          </div>
        </div>
        <div class="kern-form-input">
          <label class="kern-label" for="select">
            Empfänger auswählen
          </label>
          <div class="kern-form-input__select-wrapper">
            <select class="kern-form-input__select" id="select">
              <option>Bitte auswählen</option>
            </select>
          </div>
        </div>
        <div>
          <button class="kern-btn kern-btn--secondary">
            <span class="kern-label">E-Mail erstellen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
