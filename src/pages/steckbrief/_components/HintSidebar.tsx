import type { ComponentChildren, JSX } from "preact";

export interface HintSidebarProps extends Omit<
  JSX.HTMLAttributes<HTMLElement>,
  "title"
> {
  children?: ComponentChildren;
  closeLabel?: string;
  onClose?: JSX.MouseEventHandler<HTMLButtonElement>;
  class?: string;
}

export default function HintSidebar({
  children,
  closeLabel = "Hinweis schließen",
  onClose,
  class: className,
  ...attrs
}: HintSidebarProps) {
  return (
    <aside
      class={`flex flex-col gap-32 bg-[#f7f7f9] pt-40 pr-24 pb-40 pl-24 ${className ?? ""}`.trim()}
      {...attrs}
    >
      <div class="flex justify-end">
        <button
          type="button"
          aria-label={closeLabel}
          class="border-cosmic-blue-base text-cosmic-blue-base focus-visible:outline-cosmic-blue-base flex size-48 items-center justify-center rounded border transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={onClose}
        >
          <svg
            aria-hidden="true"
            class="size-24"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      <div class="flex flex-col gap-16 text-[#0b0c0c]">{children}</div>
    </aside>
  );
}
