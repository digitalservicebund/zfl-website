<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import {
    FLOW_SIDEBAR_CONTEXT_NAME,
    type FlowSidebarContext,
  } from "./_flowSidebar";
  import { slugify } from "@/utils/slugify";

  let {
    title,
    anchorName,
    color,
    children,
    sidebar,
  }: {
    title: string;
    /**
     * CSS anchor name (e.g. "--cluster-first") assigned to this section's
     * title dot, so it can be targeted from outside via `anchor()`.
     */
    anchorName?: string;
    color?: string;
    children: Snippet;
    /**
     * Sidebar content shown in the global sidebar.
     * Accepts either a single `Snippet` or an array of `Snippet`s (multi-page).
     */
    sidebar?: Snippet | Snippet[];
  } = $props();

  const sidebarContext = getContext<FlowSidebarContext | undefined>(
    FLOW_SIDEBAR_CONTEXT_NAME,
  );

  // Slugified so it's safe to use as an HTML id
  const id = $derived(slugify(title));

  // Normalizes `sidebar` to an array of pages
  const sidebarPages = $derived(
    sidebar === undefined
      ? undefined
      : Array.isArray(sidebar)
        ? sidebar
        : [sidebar],
  );

  // Registers this section's sidebar content synchronously (not inside an
  // `$effect`) so it's part of the server-rendered markup too - `$effect`
  // never runs during SSR, which otherwise left the sidebar panel and
  // DotNav dots missing until hydration.
  if (sidebarPages && sidebarPages.length > 0) {
    sidebarContext?.register({
      id,
      title,
      children: sidebarPages,
      color,
    });
  }

  const isActive = $derived(sidebarContext?.activeId === id);

  let rootEl: HTMLDivElement | undefined = $state();
  let titleEl: HTMLHeadingElement | undefined = $state();

  // Tracks Tailwind's `max-sm` breakpoint, used only for the scroll-activation
  // margin below.
  let isSmallScreen = $state(false);
  $effect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    isSmallScreen = mql.matches;
    const onChange = (e: MediaQueryListEvent) => (isSmallScreen = e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  });

  // IntersectionObserver: Activates this section as soon as it crosses the
  // viewport's midline while scrolling.
  $effect(() => {
    if (!rootEl) return;

    const rootMargin = isSmallScreen
      ? "-15% 0px -85% 0px"
      : "-50% 0px -50% 0px";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sidebarContext?.isJumping) {
          sidebarContext?.setActive(id);
        }
      },
      { rootMargin },
    );

    observer.observe(rootEl);
    return () => observer.disconnect();
  });

  const titleWrapperClass =
    "z-20 flex gap-16 top-0 left-16 flex-row items-center self-start max-md:my-(--halo-thickness) max-md:ml-16 md:absolute md:left-[4vw]";

  const activate = () => {
    sidebarContext?.activate(id);
    titleEl?.scrollIntoView({ behavior: "smooth" });
  };

  const sidebarContentId = $derived(
    sidebarPages && sidebarPages.length > 0
      ? `sidebar-content-${id}`
      : undefined,
  );
</script>

<div
  bind:this={rootEl}
  class="flow-block relative w-full [--halo-thickness:24px] md:[--halo-thickness:40px] [--cluster-spacing:var(--halo-thickness)] md:[--cluster-spacing:calc(-1*var(--halo-thickness))]"
  aria-owns={sidebarContentId}
  style={color ? `--bubble-color: ${color}` : undefined}
>
  <div class={titleWrapperClass}>
    <div
      data-active={isActive ? "true" : undefined}
      class="size-28 border-2 border-white rounded-full transition-colors duration-300 outline-2 bg-black outline-transparent data-active:bg-(--bubble-color) data-active:outline-black"
      aria-hidden="true"
      style={anchorName ? `anchor-name: ${anchorName};` : undefined}
    ></div>
    <h2
      {id}
      bind:this={titleEl}
      class="kern-heading-small scroll-mt-40 my-0! bg-black text-white px-4 focus-within:outline-2 outline-offset-2 outline-(--kern-color-action-focus-default)"
    >
      <button type="button" class="focus:outline-none" onclick={activate}>
        {title}
      </button>
    </h2>
  </div>

  {@render children()}
</div>
