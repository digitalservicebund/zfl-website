<script lang="ts">
  import { getContext, setContext } from "svelte";
  import type { Snippet } from "svelte";
  import {
    FLOW_SIDEBAR_CONTEXT_NAME,
    type FlowSidebarContext,
  } from "./_flowSidebar";
  import {
    FLOW_SECTION_CONTEXT_NAME,
    type FlowSectionContext,
  } from "./_flowSection";
  import { slugify } from "@/utils/slugify";

  let {
    title,
    anchorName,
    color,
    children,
    sidebar,
  }: {
    /**
     * Also doubles as this Section's identity in the shared sidebar/highlight
     * state (see `highlightId`) and as the id every nested Cluster's
     * highlight mirrors.
     */
    title: string;
    /**
     * CSS anchor name (e.g. "--cluster-first") assigned to this section's
     * title dot, so it can be targeted from outside via `anchor()`.
     */
    anchorName?: string;
    /**
     * Fill color used for this section's title dot and for the sidebar's
     * accent tint - independent of any nested Cluster's own `color`, since a
     * group's later members (e.g. a trailing "highlightGroup" Cluster) may
     * use a different color for their own bubbles.
     */
    color?: string;
    /** The Cluster(s)/Arrow(s) making up this section. */
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

  // Registers this section's sidebar content as soon as it mounts
  $effect(() => {
    if (!sidebarPages || sidebarPages.length === 0) return;

    sidebarContext?.register({
      id,
      title,
      children: sidebarPages,
      color,
    });
    return () => sidebarContext?.unregister(id);
  });

  const isActive = $derived(sidebarContext?.activeId === id);

  // Exposed to nested `_Cluster.svelte` instances that have no title/highlight
  // identity of their own, so they can still reflect the group's active state.
  setContext<FlowSectionContext>(FLOW_SECTION_CONTEXT_NAME, {
    get isActive() {
      return isActive;
    },
  });

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
  // viewport's midline while scrolling. One observer for the whole section
  // (rather than one per nested Cluster) is enough - every member shares the
  // same `title` identity, so the active window this produces is just the
  // union of what per-Cluster observers would have produced. Suppressed
  // while `navigateStep`'s `scrollIntoView` is auto-scrolling
  // (`sidebarContext.isJumping`).
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

  // Static - set once, never toggled by `isActive` - so this section's owned
  // sidebar content (rendered by `_FlowSidebar.svelte`, see there) is always
  // in this section's place in the accessibility tree, regardless of which
  // section currently happens to be active. Matches the same condition
  // `_FlowLayout.svelte`'s registration effect uses.
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
      class={`size-28 border-2 border-white rounded-full transition-colors duration-300 outline-2 ${isActive ? "bg-(--bubble-color) outline-black" : "bg-black outline-transparent"}`}
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
