<script lang="ts">
  import { tick } from "svelte";
  import IconClose from "~icons/ic/round-close";
  import type { Finding } from "@/content.config";
  import { highlightBody } from "./_highlight";

  let {
    body,
    finding,
    onClose,
  }: {
    body: string;
    finding: Finding | undefined;
    onClose: () => void;
  } = $props();

  const isOpen = $derived(!!finding);

  const highlightedHtml = $derived(
    finding ? highlightBody(body, finding.id) : "",
  );

  let scrollContainer: HTMLDivElement | undefined = $state();

  $effect(() => {
    void finding;
    if (!scrollContainer) return;
    tick().then(() => {
      scrollContainer
        ?.querySelector(".finding-highlight")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
</script>

<aside
  aria-label="Fundstelle im Gesetzestext"
  class="col-start-1 row-start-1 w-full self-stretch overflow-x-clip lg:col-start-2"
>
  <div
    class={`pointer-events-none sticky top-0 z-50 flex h-screen w-full items-end transition-transform duration-500 ease-out lg:w-450 lg:items-stretch ${isOpen ? "" : "max-lg:translate-y-full lg:translate-x-full"}`}
  >
    <div
      class="pointer-events-auto flex max-h-[70vh] w-full flex-col bg-lavender-200 lg:max-h-screen"
    >
      <div class="flex shrink-0 items-center justify-between gap-16 p-24">
        <p class="kern-label mb-0 truncate">
          {finding?.locationLabel}
        </p>
        <button
          type="button"
          class="kern-btn kern-btn--secondary kern-btn--only-icon shrink-0"
          onclick={onClose}
          aria-label="Seitenleiste schließen"
        >
          <IconClose class="text-xl" aria-hidden="true" />
        </button>
      </div>
      <div
        bind:this={scrollContainer}
        class="scroll-shadow kern-body--small min-h-0 flex-1 overflow-y-auto whitespace-pre-wrap px-24 pb-24"
      >
        <!-- eslint-disable-next-line svelte/no-at-html-tags -- highlightBody escapes the raw law text itself and only injects a <mark> wrapper we control -->
        {@html highlightedHtml}
      </div>
    </div>
  </div>
</aside>

<style>
  /* Pure-CSS "scroll shadow"
     Reference: https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/
  */
  .scroll-shadow {
    background:
    /* Shadow Cover TOP */
      linear-gradient(var(--color-lavender-200) 30%, rgba(255, 255, 255, 0))
        center top,
      /* Shadow Cover BOTTOM */
      linear-gradient(rgba(255, 255, 255, 0), var(--color-lavender-200) 70%)
        center bottom,
      /* Shadow TOP */
      radial-gradient(
          farthest-side at 50% 0,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0)
        )
        center top,
      /* Shadow BOTTOM */
      radial-gradient(
          farthest-side at 50% 100%,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0)
        )
        center bottom;

    background-repeat: no-repeat;
    background-size:
      100% 40px,
      100% 40px,
      100% 14px,
      100% 14px;
    background-attachment: local, local, scroll, scroll;
  }
</style>
