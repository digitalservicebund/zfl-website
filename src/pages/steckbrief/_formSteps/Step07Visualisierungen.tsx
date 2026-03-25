export default function Step07Visualisierungen() {
  return (
    <>
      <div class="flex flex-col gap-16">
        <h2 class="mt-0">Visualisierungen</h2>
        <p>
          Falls vorhanden: hängen Sie Visualisierungen an, die im Kontext des
          Vorhabens relevant sind z.B. Mind Map, Stakeholdermap,
          „RegulierungsMapping", Projektplan
        </p>
      </div>

      <div class="kern-form-input">
        <label class="kern-label" for="visualisierungen">
          Visualisierungen hochladen{" "}
          <span class="kern-label__optional">- Optional</span>
        </label>
        <div class="kern-hint" id="visualisierungen-hint">
          Erlaubte Formate: JPG, PNG, PDF.
        </div>
        <input
          class="kern-form-input__input"
          id="visualisierungen"
          type="file"
          multiple
          aria-describedby="visualisierungen-hint"
        />
      </div>
    </>
  );
}
