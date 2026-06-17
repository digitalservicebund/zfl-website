import Alpine from "alpinejs";

type TableRow = Record<string, unknown>;

type DynamicTableState<T extends TableRow> = {
  rows: T[];
  addNewRow(this: DynamicTableState<T>): void;
  deleteRow(this: DynamicTableState<T>, index: number): void;
};

export function registerDynamicTable<T extends TableRow>(
  name: string,
  createRow: () => T,
  initialRows: T[] = [],
) {
  document.addEventListener("alpine:init", () => {
    Alpine.data(
      name,
      (): DynamicTableState<T> => ({
        rows: [...initialRows],
        addNewRow() {
          this.rows.push(createRow());
        },
        deleteRow(index: number) {
          this.rows.splice(index, 1);
        },
      }),
    );
  });
}
