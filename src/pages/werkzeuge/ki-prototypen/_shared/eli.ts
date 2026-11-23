const RIS_BASE_URL = "https://testphase.rechtsinformationen.bund.de/gesetze";

// Most examples reference a RIS ELI path. EU legislation isn't indexed in
// RIS, so its `eli` field holds a full EUR-Lex URL instead — used as-is.
export function resolveEliUrl(eli: string): string {
  return eli.startsWith("http") ? eli : `${RIS_BASE_URL}/${eli}`;
}
