import type { Finding } from "@/content.config";
import type { PotenzialeExample } from "../potenziale/_types";
import type { LawExample, VisOption } from "../visualisieren/_types";

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

export async function getMermaid(
  sessionId: string,
  option: VisOption,
): Promise<string> {
  const response = await fetch(`${API_BASE}/mermaid`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId,
      name: option.name,
      articles: option.articles,
    }),
  });
  if (!response.ok) {
    throw new Error(
      `getMermaid failed: ${response.status} ${await extractErrorDetail(response)}`,
    );
  }
  const data = await response.json();
  return data.mermaid;
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
