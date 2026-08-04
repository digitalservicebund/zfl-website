<script lang="ts">
  import type { IconType } from "./_icons.ts";

  let {
    icon: IconComponent,
    color,
  }: {
    icon: IconType;
    color?: string;
  } = $props();
</script>

<div
  class={`size-32 sm:size-40 rounded-full bg-radial from-transparent to-white/30 border border-white flex items-center justify-center text-white`}
  style={color ? `background-color: ${color};` : undefined}
>
  <IconComponent class="size-16 sm:size-20" aria-hidden="true" />
</div>
