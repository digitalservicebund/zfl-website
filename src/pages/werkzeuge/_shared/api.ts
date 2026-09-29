import type { Finding } from "@/content.config";
import type { PotenzialeExample } from "../potenziale/_types";
import type { LawExample, VisOption, VisType } from "../visualisieren/_types";

// TODO: move to env/config once the backend has a stable deployment.
const API_BASE = "http://localhost:8000";

export type VisOptionsResult = {
  /** Set when the options came from the backend; required for getMermaid(). */
  sessionId?: string;
  options: VisOption[];
};

// FastAPI's default error shape, e.g. from HTTPException(status_code, detail).
async function extractErrorDetail(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data?.detail === "string") return data.detail;
  } catch {
    // response body wasn't JSON; fall through to the status text
  }
  return response.statusText;
}

export async function getVisOptions(
  exampleOrDraftText: LawExample | string,
): Promise<VisOptionsResult> {
  if (typeof exampleOrDraftText === "string") {
    const response = await fetch(`${API_BASE}/vis-options`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: exampleOrDraftText }),
    });
    if (!response.ok) {
      throw new Error(
        `getVisOptions failed: ${response.status} ${await extractErrorDetail(response)}`,
      );
    }
    const data = await response.json();
    return { sessionId: data.sessionId, options: data.visOptions };
  } else {
    return { options: exampleOrDraftText.visOptions };
  }
}

export type MermaidResult = {
  mermaid: string;
  /** Shown under "Was ist zu sehen?"; empty if the model left it out. */
  summary: string;
};

export async function getMermaid(
  sessionId: string,
  option: VisOption,
): Promise<MermaidResult> {
  const response = await fetch(`${API_BASE}/mermaid`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId,
      name: option.name,
      visType: option.visType,
      articles: option.articles,
    }),
  });
  if (!response.ok) {
    throw new Error(
      `getMermaid failed: ${response.status} ${await extractErrorDetail(response)}`,
    );
  }
  const data = await response.json();
  return { mermaid: data.mermaid, summary: data.summary ?? "" };
}

export type RefineRequest = {
  /** Absent for preset examples; the backend then refines without the law text. */
  sessionId?: string;
  visType: VisType;
  mermaid: string;
  /** Chat turns so far, ending with the new change request. */
  history: { role: "user" | "assistant"; content: string }[];
};

export type RefineResult = {
  reply: string;
  /** null when the backend answered or asked back without changing the diagram. */
  mermaid: string | null;
  /** Short description of the change for the version list, e.g. "Pfeile beschriftet"; null along with mermaid or if the model left it out. */
  label: string | null;
};

export async function refineMermaid(
  request: RefineRequest,
  signal?: AbortSignal,
): Promise<RefineResult> {
  const response = await fetch(`${API_BASE}/refine`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    signal,
  });
  if (!response.ok) {
    throw new Error(
      `refineMermaid failed: ${response.status} ${await extractErrorDetail(response)}`,
    );
  }
  return await response.json();
}

export type ChecksResult = {
  /** Set when the findings came from the backend; currently unused but kept for parity with getVisOptions(). */
  sessionId?: string;
  findings: Finding[];
};

export async function getChecks(
  exampleOrDraftText: PotenzialeExample | string,
): Promise<ChecksResult> {
  if (typeof exampleOrDraftText === "string") {
    const response = await fetch(`${API_BASE}/checks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: exampleOrDraftText }),
    });
    if (!response.ok) {
      throw new Error(
        `getChecks failed: ${response.status} ${await extractErrorDetail(response)}`,
      );
    }
    const data = await response.json();
    return { sessionId: data.sessionId, findings: data.findings };
  } else {
    return { findings: exampleOrDraftText.findings };
  }
}
