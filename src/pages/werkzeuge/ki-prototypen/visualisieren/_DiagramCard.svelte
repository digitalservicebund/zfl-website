<script lang="ts">
  import type { LawOwner } from "@/content.config";
  import DiagramPreview from "./_DiagramPreview.svelte";

  interface Props {
    /** Law short title, shown as preline */
    short: string;
    /** .mmd file name (without extension) of the diagram */
    filename: string;
    title: string;
    href: string;
    /** Ministries responsible for the law, shown as tags */
    owners?: LawOwner[];
    /** Articles the diagram is based on, shown in the preline after `short`
     * unless there are more than MAX_PRELINE_ARTICLES */
    articles?: string[];
  }

  let {
    short,
    filename,
    title,
    href,
    owners = [],
    articles = [],
  }: Props = $props();

  // Longer lists wrap the preline and push the title out of line with the
  // neighbouring cards, so they fall back to just the short title.
  const MAX_PRELINE_ARTICLES = 5;
  const showArticles = $derived(
    articles.length > 0 && articles.length <= MAX_PRELINE_ARTICLES,
  );
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
    <p class="kern-preline mb-0">
      {short}
      {#if showArticles}
        {articles.join(", ")}
      {/if}
    </p>
    <h3 class="my-0 group-hover:underline">{title}</h3>
  </hgroup>
  {#if owners.length > 0}
    <span class="flex flex-wrap gap-8">
      {#each owners as owner (owner)}
        <span class="kern-badge kern-badge--tag">
          <span class="kern-label kern-label--small kern-label--subtle">
            {owner}
          </span>
        </span>
      {/each}
    </span>
  {/if}
</a>
