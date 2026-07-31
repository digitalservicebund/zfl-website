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
  class={`w-40 h-40 rounded-full bg-radial from-transparent to-white/30 border border-white flex items-center justify-center text-white`}
  style={color ? `background-color: ${color};` : undefined}
>
  <IconComponent class="w-20 h-20" aria-hidden="true" />
</div>
