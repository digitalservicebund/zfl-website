import {
  HIERARCHY_LEVELS,
  LAW_AREAS,
  NORMS,
  RELATIONS,
  RELEVANCE_REASONS,
  SEARCHABLE_LAWS,
  TERMS,
  type HierarchyLevel,
  type LawArea,
  type Norm,
  type Relation,
  type RelevanceReason,
  type SearchableLaw,
  type Term,
} from "./data";

type SidebarMode = "norm" | "evidence" | "term" | null;

const LEVEL_BADGE_BASE = "inline-flex items-center";

export const rechtErkunden = () => ({
  lawQuery: "",
  selectedLawId: null as string | null,
  selectedAreaId: null as string | null,
  activeNormIds: [] as string[],
  sidebarMode: null as SidebarMode,
  sidebarNormId: null as string | null,
  sidebarRelationId: null as string | null,
  sidebarTermId: null as string | null,

  get matchingLaws(): SearchableLaw[] {
    const query = this.lawQuery.trim().toLowerCase();
    if (!query) return [];
    return SEARCHABLE_LAWS.filter(
      (law) =>
        law.label.toLowerCase().includes(query) ||
        law.name.toLowerCase().includes(query),
    );
  },

  get selectedLaw(): SearchableLaw | null {
    return SEARCHABLE_LAWS.find((law) => law.id === this.selectedLawId) ?? null;
  },

  selectLaw(id: string) {
    this.selectedLawId = id;
    this.lawQuery = "";
    this.selectedAreaId = null;
    this.activeNormIds = [];
    this.closeSidebar();
  },

  clearLaw() {
    this.selectedLawId = null;
    this.selectedAreaId = null;
    this.activeNormIds = [];
    this.closeSidebar();
  },

  selectArea(id: string) {
    this.selectedAreaId = id;
    const area = LAW_AREAS.find((entry) => entry.id === id);
    this.activeNormIds = area ? [...area.normIds] : [];
    this.closeSidebar();
  },

  get selectedArea(): LawArea | null {
    return LAW_AREAS.find((entry) => entry.id === this.selectedAreaId) ?? null;
  },

  get areaNorms(): Norm[] {
    const area = this.selectedArea;
    if (!area) return [];
    return area.normIds
      .map((id) => NORMS.find((norm) => norm.id === id))
      .filter((norm): norm is Norm => Boolean(norm));
  },

  isNormActive(id: string) {
    return this.activeNormIds.includes(id);
  },

  toggleNorm(id: string) {
    if (this.activeNormIds.includes(id)) {
      this.activeNormIds = this.activeNormIds.filter((entry) => entry !== id);
    } else {
      this.activeNormIds = [...this.activeNormIds, id];
    }
  },

  get visibleRelations(): Relation[] {
    if (this.activeNormIds.length === 0) return [];
    return RELATIONS.filter((relation) =>
      relation.normIds.some((id) => this.activeNormIds.includes(id)),
    );
  },

  matrixCell(level: HierarchyLevel, reason: RelevanceReason): Relation[] {
    return this.visibleRelations.filter(
      (relation) => relation.level === level && relation.reason === reason,
    );
  },

  levelCount(level: HierarchyLevel) {
    return this.visibleRelations.filter((relation) => relation.level === level)
      .length;
  },

  reasonCount(reason: RelevanceReason) {
    return this.visibleRelations.filter(
      (relation) => relation.reason === reason,
    ).length;
  },

  get activeTerms(): Term[] {
    if (this.activeNormIds.length === 0) return [];
    return TERMS.filter((term) =>
      term.usedIn.normIds.some((id) => this.activeNormIds.includes(id)),
    );
  },

  termLawCount(term: Term) {
    return this.termAdjacentLaws(term).length;
  },

  /** Adjacent laws for a term's chips, deduplicated by law + hierarchy level. */
  termAdjacentLaws(term: Term): { lawLabel: string; level: HierarchyLevel }[] {
    const seen = new Map<string, { lawLabel: string; level: HierarchyLevel }>();
    for (const entry of term.usedIn.adjacentNorms) {
      seen.set(`${entry.lawLabel}__${entry.level}`, {
        lawLabel: entry.lawLabel,
        level: entry.level,
      });
    }
    return [...seen.values()];
  },

  openNorm(id: string) {
    this.sidebarMode = "norm";
    this.sidebarNormId = id;
    this.sidebarRelationId = null;
    this.sidebarTermId = null;
  },

  openRelation(relation: Relation) {
    this.sidebarMode = "evidence";
    this.sidebarRelationId = relation.id;
    this.sidebarNormId = null;
    this.sidebarTermId = null;
  },

  openTerm(id: string) {
    this.sidebarMode = "term";
    this.sidebarTermId = id;
    this.sidebarNormId = null;
    this.sidebarRelationId = null;
  },

  closeSidebar() {
    this.sidebarMode = null;
    this.sidebarNormId = null;
    this.sidebarRelationId = null;
    this.sidebarTermId = null;
  },

  get sidebarNorm(): Norm | null {
    return NORMS.find((norm) => norm.id === this.sidebarNormId) ?? null;
  },

  get sidebarRelation(): Relation | null {
    return (
      RELATIONS.find((relation) => relation.id === this.sidebarRelationId) ??
      null
    );
  },

  get sidebarTerm(): Term | null {
    return TERMS.find((term) => term.id === this.sidebarTermId) ?? null;
  },

  normById(id: string): Norm | null {
    return NORMS.find((norm) => norm.id === id) ?? null;
  },

  levelLabel(level: HierarchyLevel) {
    return HIERARCHY_LEVELS.find((entry) => entry.id === level)?.label ?? level;
  },

  levelBadgeClass(level: HierarchyLevel) {
    const badgeClass =
      HIERARCHY_LEVELS.find((entry) => entry.id === level)?.badgeClass ?? "";
    return `${LEVEL_BADGE_BASE} ${badgeClass}`;
  },

  reasonFullLabel(reason: RelevanceReason) {
    const entry = RELEVANCE_REASONS.find((item) => item.id === reason);
    return entry?.fullLabel ?? entry?.label ?? reason;
  },
});

export type RechtErkundenStore = ReturnType<typeof rechtErkunden>;
