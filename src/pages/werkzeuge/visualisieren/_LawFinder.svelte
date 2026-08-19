<script lang="ts">
  interface VisExample {
    name: string;
    filename: string;
  }

  interface LawExample {
    title: string;
    short: string;
    eli: string;
    visOptions: VisExample[];
  }

  interface Props {
    examples: LawExample[];
    selected: LawExample | undefined;
  }

  let { examples, selected = $bindable() }: Props = $props();

  function exampleLabel(example: LawExample | undefined): string {
    return example ? `${example.title} (${example.short})` : "";
  }

  let query = $state(exampleLabel(selected));
  let open = $state(false);
  let activeIndex = $state(-1);
  let optionRefs: (HTMLLIElement | null)[] = [];

  let filtered = $derived.by(() => {
    const term = query.trim().toLowerCase();
    if (!term) return examples;
    return examples.filter((example) =>
      exampleLabel(example).toLowerCase().includes(term),
    );
  });

  $effect(() => {
    if (open && activeIndex >= 0) {
      optionRefs[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  });

  function selectExample(example: LawExample) {
    selected = example;
    query = exampleLabel(example);
    open = false;
    activeIndex = -1;
  }

  function closeAndReset() {
    open = false;
    activeIndex = -1;
    query = exampleLabel(selected);
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
          selectExample(filtered[activeIndex]);
        }
        break;
      case "Tab":
        if (open && filtered[activeIndex]) {
          selectExample(filtered[activeIndex]);
        }
        break;
      case "Escape":
        closeAndReset();
        break;
    }
  }
</script>

<div class="kern-form-input">
  <label class="kern-label" for="gesetz">Finden Sie Ihr Gesetz</label>
  <!-- eslint-disable-next-line svelte/no-static-element-interactions -- listens for focusout bubbling from the input/listbox to close the popup on outside focus -->
  <div class="relative w-full max-w-a11y" onfocusout={handleFocusOut}>
    <input
      class="kern-form-input__input"
      id="gesetz"
      name="gesetz"
      type="text"
      role="combobox"
      aria-expanded={open}
      aria-controls="gesetz-listbox"
      aria-autocomplete="list"
      aria-activedescendant={activeIndex >= 0
        ? `gesetz-option-${activeIndex}`
        : undefined}
      autocomplete="off"
      bind:value={query}
      oninput={handleInput}
      onfocus={handleFocus}
      onkeydown={handleKeydown}
    />
    {#if open && filtered.length > 0}
      <ul
        id="gesetz-listbox"
        role="listbox"
        class="absolute z-10 mt-4 max-h-320 w-full overflow-auto rounded border border-gray-400 bg-white shadow-lg list-unstyled"
      >
        {#each filtered as example, index (example.title)}
          <li
            bind:this={optionRefs[index]}
            id={`gesetz-option-${index}`}
            role="option"
            aria-selected={example === selected}
            class={`cursor-pointer px-16 py-8 ${index === activeIndex ? "bg-lavender-200" : ""}`}
            onmousedown={(event) => {
              event.preventDefault();
              selectExample(example);
            }}
            onmouseenter={() => (activeIndex = index)}
          >
            {exampleLabel(example)}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
