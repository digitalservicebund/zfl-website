<script lang="ts">
  import DiagramPreview from "./_DiagramPreview.svelte";

  interface Props {
    /** Law short title, shown as preline */
    short: string;
    /** .mmd file name (without extension) of the diagram */
    filename: string;
    title: string;
    href: string;
  }

  let { short, filename, title, href }: Props = $props();
</script>

<a {href} class="link-unstyled group flex flex-col gap-16">
  <div
    class="bg-lavender-200 group-hover:bg-lavender-400 relative aspect-[400/340] overflow-hidden p-16"
  >
    <DiagramPreview {short} {filename} />
    <!-- Fades out tall diagrams that are cropped at the bottom. -->
    <div
      class="from-lavender-200 group-hover:from-lavender-400 absolute inset-x-0 bottom-0 h-48 bg-linear-to-t"
      aria-hidden="true"
    ></div>
  </div>
  <hgroup class="flex flex-col">
    <p class="kern-preline mb-0">{short}</p>
    <h3 class="my-0 group-hover:underline">{title}</h3>
  </hgroup>
</a>
