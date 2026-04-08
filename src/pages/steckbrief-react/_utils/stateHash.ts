/**
 * Compress an arbitrary object into a URL-safe base64 string using the
 * built-in CompressionStream API (deflate-raw). No external dependencies.
 * Targeting modern browsers only.
 */
export async function compressState(state: unknown): Promise<string> {
  const json = JSON.stringify(state);
  const bytes = new TextEncoder().encode(json);

  const cs = new CompressionStream("deflate-raw");
  const writer = cs.writable.getWriter();
  writer.write(bytes);
  writer.close();

  const compressed = await new Response(cs.readable).arrayBuffer();
  // Convert to URL-safe base64 (replace +/ with -_, strip =)
  return btoa(String.fromCharCode(...new Uint8Array(compressed)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Decompress a URL-safe base64 string produced by compressState back into
 * the original object.
 */
export async function decompressState<T>(hash: string): Promise<T> {
  // Restore standard base64 from URL-safe variant
  const base64 = hash.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));

  const ds = new DecompressionStream("deflate-raw");
  const writer = ds.writable.getWriter();
  writer.write(bytes);
  writer.close();

  const decompressed = await new Response(ds.readable).arrayBuffer();
  const json = new TextDecoder().decode(decompressed);
  return JSON.parse(json) as T;
}
