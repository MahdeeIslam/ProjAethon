export function encodeMediaPath(p: string): string {
  return p.split('/').map((s) => encodeURIComponent(s)).join('/')
}
