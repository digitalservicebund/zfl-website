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
  return (
    <div class="sticky bottom-0 z-10 border-t border-[#A5AAC3] bg-white py-16">
      <div class="flex items-center justify-center gap-16 px-16">
        <div class="kern-body kern-body--muted pr-40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            aria-hidden="true"
            class="mx-8 inline-block shrink-0"
          >
            <path
              fill="currentColor"
              d="m17.66 9.53l-7.07 7.07l-4.24-4.24l1.41-1.41l2.83 2.83l5.66-5.66zM4 12c0-2.33 1.02-4.42 2.62-5.88L9 8.5v-6H3l2.2 2.2C3.24 6.52 2 9.11 2 12c0 5.19 3.95 9.45 9 9.95v-2.02c-3.94-.49-7-3.86-7-7.93m18 0c0-5.19-3.95-9.45-9-9.95v2.02c3.94.49 7 3.86 7 7.93c0 2.33-1.02 4.42-2.62 5.88L15 15.5v6h6l-2.2-2.2c1.96-1.82 3.2-4.41 3.2-7.3"
            />
          </svg>{" "}
          Ihre Daten werden automatisch im Browser gespeichert.
        </div>
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
            <span class="kern-label">Steckbrief herunterladen</span>
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
  );
}
