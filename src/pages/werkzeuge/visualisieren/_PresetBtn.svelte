<script lang="ts">
  interface Props {
    title: string;
    subline?: string;
    active?: boolean;
    onclick: () => void;
  }
  let { title, subline, active, onclick }: Props = $props();
</script>

<!-- A button, not a radio input: picking an option advances the wizard, and
     a radio group would already select (and advance) on arrow keys. The
     radio circle is drawn to match KERN's .kern-form-check__radio. -->
<button
  type="button"
  class="group flex items-start gap-24 rounded-sm border border-(--kern-color-decorative-border-default) bg-white p-24 text-left hover:bg-lavender-200 aria-current:bg-lavender-400"
  aria-current={active ? "true" : undefined}
  onclick={() => onclick()}
>
  <span
    class="flex size-32 shrink-0 items-center justify-center rounded-full border-2 border-(--kern-color-form-input-border-contextual) bg-(--kern-color-layout-layer-surface-contextual) group-hover:border-4"
    aria-hidden="true"
  >
    {#if active}
      <span
        class="size-12 rounded-full bg-(--kern-color-form-input-border-contextual)"
      ></span>
    {/if}
  </span>
  <span class="flex flex-col gap-16 pt-7 pb-9">
    <span class="font-semibold">{title}</span>
    {#if subline}
      <span class="kern-body--small kern-body--muted">{subline}</span>
    {/if}
  </span>
</button>
