class PageSearchElement extends HTMLElement {
  toggleButton!: HTMLButtonElement;
  form!: HTMLFormElement;
  input!: HTMLInputElement;
  countEl!: HTMLElement;
  prevButton!: HTMLButtonElement;
  nextButton!: HTMLButtonElement;
  closeButton!: HTMLButtonElement;

  marks: HTMLElement[] = [];
  matchCount = 0;
  currentIndex = 0;
  debounceId: ReturnType<typeof setTimeout> | undefined;

  connectedCallback() {
    this.toggleButton = this.querySelector("[data-page-search-toggle]")!;
    this.form = this.querySelector("[data-page-search-form]")!;
    this.input = this.querySelector("[data-page-search-input]")!;
    this.countEl = this.querySelector("[data-page-search-count]")!;
    this.prevButton = this.querySelector("[data-page-search-prev]")!;
    this.nextButton = this.querySelector("[data-page-search-next]")!;
    this.closeButton = this.querySelector("[data-page-search-close]")!;

    this.toggleButton.addEventListener("click", () => this.open());
    this.closeButton.addEventListener("click", () => this.close());
    this.prevButton.addEventListener("click", () => this.goToPrevious());
    this.nextButton.addEventListener("click", () => this.goToNext());

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.goToNext();
    });

    this.input.addEventListener("input", () => {
      clearTimeout(this.debounceId);
      this.debounceId = setTimeout(() => this.runSearch(), 150);
    });

    this.input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.close();
      } else if (event.key === "Enter" && event.shiftKey) {
        event.preventDefault();
        this.goToPrevious();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (this.form.hidden) {
        if (this.getAttribute("keyboard-shortcut") !== "true") return;
        const isFindShortcut =
          (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "f";
        if (!isFindShortcut) return;
        event.preventDefault();
        this.open();
      } else if (event.key === "Escape") {
        this.close();
      }
    });
  }

  open() {
    this.toggleButton.hidden = true;
    this.form.hidden = false;
    this.toggleButton.setAttribute("aria-expanded", "true");
    this.input.focus();
    this.input.select();
  }

  close() {
    this.form.hidden = true;
    this.toggleButton.hidden = false;
    this.toggleButton.setAttribute("aria-expanded", "false");
    this.input.value = "";
    this.clearHighlights();
    this.updateCount();
    this.toggleButton.focus();
  }

  // Ignore text belonging to this widget itself, plus non-content elements.
  isSearchableNode(node: Node) {
    return !node.parentElement?.closest(
      "page-search, script, style, noscript, textarea",
    );
  }

  collectTextNodes() {
    const rootSelector = this.getAttribute("root-selector") || "main";
    const rootElement = document.querySelector(rootSelector);
    if (!rootElement) return [];
    const walker = document.createTreeWalker(
      rootElement,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          if (!node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
          if (!this.isSearchableNode(node)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      },
    );

    const nodes: Text[] = [];
    let current: Node | null;
    while ((current = walker.nextNode())) nodes.push(current as Text);
    return nodes;
  }

  // Wraps every occurrence of `query` in the page text with a <mark>.
  highlightMatches(query: string) {
    const marks: HTMLElement[] = [];
    const lowerQuery = query.toLowerCase();

    for (const textNode of this.collectTextNodes()) {
      const text = textNode.nodeValue ?? "";
      const lowerText = text.toLowerCase();
      let matchIndex = lowerText.indexOf(lowerQuery);
      if (matchIndex === -1) continue;

      const fragment = document.createDocumentFragment();
      let cursor = 0;
      while (matchIndex !== -1) {
        if (matchIndex > cursor) {
          fragment.append(text.slice(cursor, matchIndex));
        }
        const mark = document.createElement("mark");
        mark.className = "page-search__highlight";
        mark.append(text.slice(matchIndex, matchIndex + query.length));
        fragment.append(mark);
        marks.push(mark);

        cursor = matchIndex + query.length;
        matchIndex = lowerText.indexOf(lowerQuery, cursor);
      }
      if (cursor < text.length) fragment.append(text.slice(cursor));

      textNode.parentNode?.replaceChild(fragment, textNode);
    }

    return marks;
  }

  clearHighlights() {
    for (const mark of this.marks) {
      const parent = mark.parentNode;
      if (!parent) continue;
      parent.replaceChild(
        document.createTextNode(mark.textContent ?? ""),
        mark,
      );
      parent.normalize();
    }
    this.marks = [];
    this.matchCount = 0;
    this.currentIndex = 0;
  }

  runSearch() {
    const query = this.input.value.trim();
    this.clearHighlights();

    if (!query) {
      this.updateCount();
      return;
    }

    this.marks = this.highlightMatches(query);
    this.matchCount = this.marks.length;
    this.currentIndex = this.matchCount > 0 ? 1 : 0;
    if (this.matchCount > 0) this.focusMark(0);

    this.updateCount();
  }

  focusMark(index: number) {
    const mark = this.marks[index];
    if (!mark) return;
    for (const other of this.marks) {
      other.classList.remove("page-search__highlight--current");
    }
    mark.classList.add("page-search__highlight--current");
    mark.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  goToNext() {
    const query = this.input.value.trim();
    if (!query) return;
    if (this.matchCount === 0) {
      this.runSearch();
      return;
    }

    this.currentIndex =
      this.currentIndex >= this.matchCount ? 1 : this.currentIndex + 1;
    this.focusMark(this.currentIndex - 1);
    this.updateCount();
  }

  goToPrevious() {
    const query = this.input.value.trim();
    if (!query) return;
    if (this.matchCount === 0) {
      this.runSearch();
      return;
    }

    this.currentIndex =
      this.currentIndex <= 1 ? this.matchCount : this.currentIndex - 1;
    this.focusMark(this.currentIndex - 1);
    this.updateCount();
  }

  updateCount() {
    const hasQuery = this.input.value.trim().length > 0;
    if (hasQuery) {
      this.countEl.textContent =
        this.matchCount === 0
          ? "Keine Treffer"
          : `${this.currentIndex} von ${this.matchCount}`;
    } else {
      this.countEl.textContent = "";
    }

    this.prevButton.disabled = this.matchCount === 0;
    this.nextButton.disabled = this.matchCount === 0;
  }
}

if (!customElements.get("page-search")) {
  customElements.define("page-search", PageSearchElement);
}
