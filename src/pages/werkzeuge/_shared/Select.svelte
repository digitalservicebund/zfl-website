<script lang="ts" generics="T">
  import type { Snippet } from "svelte";

  // Select-only combobox (WAI-ARIA APG pattern). A native <select> can't
  // render custom option content like icons, hence the custom listbox.
  interface Props {
    items: T[];
    selected: T | undefined;
    getLabel: (item: T) => string;
    id: string;
    placeholder?: string;
    class?: string;
    /** Custom content for an option; also used for the selected value in the trigger. */
    option?: Snippet<[T]>;
  }

  let {
    items,
    selected = $bindable(),
    getLabel,
    id,
    placeholder,
    class: className,
    option,
  }: Props = $props();

  const listboxId = $derived(`${id}-listbox`);
  const optionId = (index: number) => `${id}-option-${index}`;

  let open = $state(false);
  let activeIndex = $state(-1);
  let optionRefs: (HTMLLIElement | null)[] = [];

  let typeaheadTerm = "";
  let typeaheadTimeout: ReturnType<typeof setTimeout> | undefined;

  $effect(() => {
    if (open && activeIndex >= 0) {
      optionRefs[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  });

  function openList() {
    open = true;
    const selectedIndex = selected ? items.indexOf(selected) : -1;
    activeIndex = selectedIndex >= 0 ? selectedIndex : 0;
  }

  function close() {
    open = false;
    activeIndex = -1;
  }

  function selectItem(item: T) {
    selected = item;
    close();
  }

  function moveActive(delta: number) {
    if (items.length === 0) return;
    activeIndex = (activeIndex + delta + items.length) % items.length;
  }

  function handleTypeahead(key: string) {
    clearTimeout(typeaheadTimeout);
    typeaheadTerm += key.toLowerCase();
    typeaheadTimeout = setTimeout(() => (typeaheadTerm = ""), 500);

    const index = items.findIndex((item) =>
      getLabel(item).toLowerCase().startsWith(typeaheadTerm),
    );
    if (index < 0) return;
    if (open) activeIndex = index;
    else selected = items[index];
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openList();
      } else if (event.key.length === 1) {
        handleTypeahead(event.key);
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveActive(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveActive(-1);
        break;
      case "Home":
        event.preventDefault();
        activeIndex = 0;
        break;
      case "End":
        event.preventDefault();
        activeIndex = items.length - 1;
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (items[activeIndex]) selectItem(items[activeIndex]);
        break;
      case "Tab":
        if (items[activeIndex]) selectItem(items[activeIndex]);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      default:
        if (event.key.length === 1) handleTypeahead(event.key);
    }
  }
</script>

{#snippet content(item: T)}
  {#if option}
    {@render option(item)}
  {:else}
    {getLabel(item)}
  {/if}
{/snippet}

<div class={["kern-form-input__select-wrapper", className]}>
  <button
    type="button"
    class="kern-form-input__select flex items-center gap-8 text-left"
    {id}
    role="combobox"
    aria-haspopup="listbox"
    aria-expanded={open}
    aria-controls={listboxId}
    aria-activedescendant={open && activeIndex >= 0
      ? optionId(activeIndex)
      : undefined}
    onclick={() => (open ? close() : openList())}
    onkeydown={handleKeydown}
    onblur={close}
  >
    {#if selected}
      {@render content(selected)}
    {:else}
      <span class="kern-body--muted">{placeholder}</span>
    {/if}
  </button>
  {#if open && items.length > 0}
    <ul
      id={listboxId}
      role="listbox"
      tabindex="-1"
      class="absolute top-full z-10 mt-4 max-h-320 w-full overflow-auto rounded border border-gray-400 bg-white shadow-lg list-unstyled"
    >
      {#each items as item, index (getLabel(item))}
        <li
          bind:this={optionRefs[index]}
          id={optionId(index)}
          role="option"
          aria-selected={item === selected}
          class={[
            "flex cursor-pointer items-center gap-8 px-16 py-8",
            index === activeIndex && "bg-lavender-200",
            item === selected && "font-bold",
          ]}
          onmousedown={(event) => {
            // Keeps focus on the trigger so its blur doesn't close the list first
            event.preventDefault();
            selectItem(item);
          }}
          onmouseenter={() => (activeIndex = index)}
        >
          {@render content(item)}
        </li>
      {/each}
    </ul>
  {/if}
</div>
