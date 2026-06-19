import Alpine from "alpinejs";

type TableRow = Record<string, unknown>;

type DynamicTableState<T extends TableRow> = {
  rows: T[];
  addNewRow(this: DynamicTableState<T>): void;
  deleteRow(this: DynamicTableState<T>, index: number): void;
  saveToStorage(this: DynamicTableState<T>): void;
};

export function registerDynamicTable<T extends TableRow>(
  name: string,
  createRow: () => T,
  initialRows: T[] | (() => T[]) = [],
  storageKey?: string,
) {
  document.addEventListener("alpine:init", () => {
    Alpine.data(name, (): DynamicTableState<T> => {
      const loadRows = (): T[] => {
        // Resolve initialRows: could be an array or a function that returns an array
        const resolvedInitialRows =
          typeof initialRows === "function" ? initialRows() : initialRows;

        if (!storageKey) return [...resolvedInitialRows];
        try {
          const raw = localStorage.getItem(storageKey);
          // If data exists in storage and is not empty, use it. Otherwise use initialRows.
          if (raw) {
            const parsed = JSON.parse(raw) as T[];
            if (Array.isArray(parsed) && parsed.length > 0) {
              return parsed;
            }
          }
          return [...resolvedInitialRows];
        } catch {
          return [...resolvedInitialRows];
        }
      };

      return {
        rows: loadRows(),
        addNewRow() {
          this.rows.push(createRow());
        },
        deleteRow(index: number) {
          this.rows.splice(index, 1);
        },
        saveToStorage() {
          if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(this.rows));
          }
        },
      };
    });
  });
}
