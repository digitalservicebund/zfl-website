import IconAccountTree from "~icons/ic/outline-account-tree";
import IconHub from "~icons/ic/outline-hub";
import IconTimeline from "~icons/ic/outline-view-timeline";
import type { VisType } from "./_types";

export const visTypeIcons = {
  flowchart: IconAccountTree,
  swimlane: IconTimeline,
  actors: IconHub,
} as const satisfies Record<VisType, unknown>;
