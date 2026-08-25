<script lang="ts">
  import MagicIcon from "~icons/ic/outline-auto-awesome";

  interface Check {
    patterns: RegExp[];
    color: string;
    label: string;
    annotation: string;
  }

  let draft = $state("");
  let potentials = $state<Set<Check>>(new Set());

  const exampleDraft = `Gesetzentwurf zur Neuregelung der Elterngeldbeantragung (Elterngeld-Verfahrensgesetz)

Der Gesetzentwurf sieht ein mehrstufiges Antragsverfahren für das Elterngeld vor. Grundlage bildet ein Antrag in Schriftform, der bei der zuständigen Elterngeldstelle einzureichen ist. Voraussetzung für die Antragstellung ist die vorherige Einholung mehrerer Bescheinigungen: Das Standesamt bestätigt die Geburt und meldet diese an das Einwohnermeldeamt, welches wiederum eine Meldebescheinigung ausstellt. Zusätzlich ist beim Finanzamt eine Bescheinigung über die zu versteuernden Einkünfte anzufordern, die dem Arbeitgeber zur Ausstellung der Verdienstbescheinigung vorzulegen ist. Erst nach Vorlage sämtlicher Unterlagen kann der Antrag bei der Elterngeldstelle eingereicht werden, wo er in ein zentrales Register aufgenommen und dort geprüft wird. Rückfragen der Behörde sowie der Bescheid selbst werden postalisch übermittelt, da die beteiligten Stellen unterschiedliche Aktenführungssysteme nutzen und eine durchgängige elektronische Bearbeitung derzeit nicht vorgesehen ist. Die Bearbeitungsdauer verlängert sich dadurch entsprechend.`;

  const checks: Check[] = [
    {
      patterns: [/digital/, /schrift/, /bescheinigung/],
      color: "#e5cbf4",
      label: "Digitale Kommunikation",
      annotation: "Wie kommunzieren die Behörden und Bürgis?",
    },
    {
      patterns: [
        /sende/,
        /übermittel/,
        /einreich/,
        /eingereich/,
        /einzureich/,
        /meldet/,
      ],
      color: "#e6fba2",
      label: "Automatisierung",
      annotation: "Wie werden Daten der Behörde übermittelt?",
    },
    {
      patterns: [/speicher/, /register/],
      color: "#d5f6ff",
      label: "Datenschutz",
      annotation: "Welche Daten werden abgefragt?",
    },
  ];

  function escapeHtml(text: string) {
    return text.replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char]!,
    );
  }

  function analyzeDraft() {
    const text = document.getElementById("textarea")?.value ?? "";
    potentials.clear();

    draft = text
      .split(/(\s+)/)
      .map((word) => {
        if (!word.trim()) return word;

        const check = checks.find((c) =>
          c.patterns.some((pattern) => pattern.test(word.toLowerCase())),
        );
        if (!check) return escapeHtml(word);

        potentials.add(check);
        return `<mark style="background: ${check.color}">${escapeHtml(word)}</mark>`;
      })
      .join("");
  }
</script>

<div class="space-y-lg min-h-[50vh]">
  <div class="space-y-24">
    <div class="kern-form-input">
      <label class="kern-label" for="textarea">
        Ihre Vorhabensbeschreibung
      </label>
      <textarea
        class="kern-form-input__input min-h-200"
        id="textarea"
        name="textarea">{exampleDraft}</textarea
      >
    </div>
    <div class="flex gap-8">
      <button
        type="button"
        class="kern-btn kern-btn--primary"
        onclick={analyzeDraft}
      >
        <MagicIcon class="text-white mr-4" aria-hidden="true" />
        <span class="kern-label">Analysieren</span>
      </button>
      <button
        type="button"
        class="kern-btn kern-btn--secondary"
        onclick={() => {
          draft = "";
          potentials.clear();
        }}
      >
        <span class="kern-label">Zurücksetzen</span>
      </button>
    </div>
  </div>

  {#if draft}
    <div class="space-y-24">
      <h2>Ergebnisse</h2>
      <div class="grid grid-cols-[2fr_1fr] gap-40">
        <div>
          <p class="whitespace-pre-wrap">{@html draft}</p>
        </div>
        {#if potentials.size}
          <div class="space-y-24 bg-lavender-200 px-24 py-32">
            <h3>Entdeckte Potenziale</h3>
            <p>Darauf sollten Sie achten:</p>
            {#each potentials as potential (potential.label)}
              <div>
                <h4>
                  <span
                    class="strong px-2"
                    style={`background: ${potential.color}`}
                    >{potential.label}</span
                  >
                </h4>
                <p>{potential.annotation}</p>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
