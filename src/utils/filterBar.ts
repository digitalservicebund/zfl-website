/**
 * Shared Alpine.js state for a single-select filter bar.
 *
 * Register under a page-specific name so multiple filter bars can coexist:
 *   Alpine.data("myFilter", filterBarData);
 */
export function filterBarData() {
  return {
    filterType: null as string | null,

    toggleFilterType(type: string) {
      this.filterType = this.filterType === type ? null : type;
    },

    matchesFilter(values: string[]) {
      return this.filterType === null || values.includes(this.filterType);
    },
  };
}
