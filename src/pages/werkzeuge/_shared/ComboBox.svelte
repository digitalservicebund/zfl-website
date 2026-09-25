<script lang="ts" generics="T">
  interface Props {
    items: T[];
    selected: T | undefined;
    getLabel: (item: T) => string;
    id: string;
    name?: string;
    placeholder?: string;
    class?: string;
  }

  let {
    items,
    selected = $bindable(),
    getLabel,
    id,
    name,
    placeholder,
    class: className,
  }: Props = $props();

  const listboxId = $derived(`${id}-listbox`);
  const optionId = (index: number) => `${id}-option-${index}`;

  function itemLabel(item: T | undefined): string {
    return item ? getLabel(item) : "";
  }

  // Writable derived: follows `selected` (also when changed from outside),
  // but can be overwritten while the user types
  let query = $derived(itemLabel(selected));
  let open = $state(false);
  let activeIndex = $state(-1);
  let optionRefs: (HTMLLIElement | null)[] = [];

  let filtered = $derived.by(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) => getLabel(item).toLowerCase().includes(term));
  });

  $effect(() => {
    if (open && activeIndex >= 0) {
      optionRefs[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  });

  function selectItem(item: T) {
    selected = item;
    query = getLabel(item);
    open = false;
    activeIndex = -1;
  }

  function closeAndReset() {
    open = false;
    activeIndex = -1;
    query = itemLabel(selected);
  }

  function handleInput() {
    open = true;
    activeIndex = filtered.length > 0 ? 0 : -1;
  }

  function handleFocus() {
    open = true;
  }

  function handleFocusOut(event: FocusEvent) {
    const container = event.currentTarget;
    const next = event.relatedTarget;
    if (
      container instanceof Node &&
      next instanceof Node &&
      container.contains(next)
    ) {
      return;
    }
    closeAndReset();
  }

  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        open = true;
        if (filtered.length > 0) {
          activeIndex = (activeIndex + 1) % filtered.length;
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        open = true;
        if (filtered.length > 0) {
          activeIndex = (activeIndex - 1 + filtered.length) % filtered.length;
        }
        break;
      case "Enter":
        if (open && filtered[activeIndex]) {
          event.preventDefault();
          selectItem(filtered[activeIndex]);
        }
        break;
      case "Tab":
        if (open && filtered[activeIndex]) {
          selectItem(filtered[activeIndex]);
        }
        break;
      case "Escape":
        closeAndReset();
        break;
    }
  }
</script>

<!-- eslint-disable-next-line svelte/no-static-element-interactions -- listens for focusout bubbling from the input/listbox to close the popup on outside focus -->
<div class={["relative", className]} onfocusout={handleFocusOut}>
  <input
    class="kern-form-input__input"
    {id}
    {name}
    type="text"
    role="combobox"
    aria-expanded={open}
    aria-controls={listboxId}
    aria-autocomplete="list"
    aria-activedescendant={activeIndex >= 0 ? optionId(activeIndex) : undefined}
    autocomplete="off"
    bind:value={query}
    {placeholder}
    oninput={handleInput}
    onfocus={handleFocus}
    onkeydown={handleKeydown}
  />
  {#if open && filtered.length > 0}
    <ul
      id={listboxId}
      role="listbox"
      class="absolute z-10 mt-4 max-h-320 w-full overflow-auto rounded border border-gray-400 bg-white shadow-lg list-unstyled"
    >
      {#each filtered as item, index (getLabel(item))}
        <li
          bind:this={optionRefs[index]}
          id={optionId(index)}
          role="option"
          aria-selected={item === selected}
          class={`cursor-pointer px-16 py-8 ${index === activeIndex ? "bg-lavender-200" : ""}`}
          onmousedown={(event) => {
            event.preventDefault();
            selectItem(item);
          }}
          onmouseenter={() => (activeIndex = index)}
        >
          {getLabel(item)}
        </li>
      {/each}
    </ul>
  {/if}
</div>
