const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefixes a root-relative asset path (e.g. "/images/foo.png") with the
 * configured basePath, so images resolve correctly when the site is hosted
 * under a subpath (e.g. GitHub Pages project sites). */
export function asset(path: string): string {
  if (!basePath) return path;
  return `${basePath}${path}`;
}
