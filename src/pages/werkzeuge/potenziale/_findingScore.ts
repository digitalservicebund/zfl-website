import type { Finding } from "@/content.config";

const SCORE_RANK: Record<Finding["potential"], number> = {
  low: 0,
  medium: 1,
  high: 2,
};

export function scoreRank(score: Finding["potential"]): number {
  return SCORE_RANK[score];
}

export function maxPotential(findings: Finding[]): number {
  return Math.max(...findings.map((finding) => scoreRank(finding.potential)));
}
