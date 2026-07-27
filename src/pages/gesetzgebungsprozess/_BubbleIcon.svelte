<script lang="ts">
  import { icons } from "./_icons.ts";

  let {
    icon,
    color,
  }: {
    icon: keyof typeof icons;
    color?: string;
  } = $props();

  const IconComponent = $derived(icons[icon]);
</script>

<div
  class={`w-40 h-40 rounded-full bg-radial from-transparent to-white/50 border border-white flex items-center justify-center text-white`}
  style={color ? `background-color: ${color};` : undefined}
>
  <IconComponent class="w-20 h-20" aria-hidden="true" />
</div>
