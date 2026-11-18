<script lang="ts">
  import type { IconType } from "./_icons.ts";
  let { icon: Icon, color }: { icon: IconType; color?: string } = $props();
</script>

<div
  class="size-32 sm:size-40 rounded-full bg-radial from-transparent to-white/50 border border-white flex items-center justify-center bg-(--bg-color) text-(--kern-color-layout-text-muted)"
  style={color ? `background-color: ${color};` : undefined}
>
  <Icon class="size-16 sm:size-20" aria-hidden="true" />
</div>
