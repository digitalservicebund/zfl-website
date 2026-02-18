export function mailto(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.append("subject", subject);
  if (body) params.append("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${email}${query && `?${query}`}`;
}
