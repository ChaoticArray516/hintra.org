import { site } from '../data/site';

export function route(path: string): string {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  return withLeadingSlash === '/' || withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

export function absolute(path: string): string {
  return new URL(route(path), site.origin).toString();
}

export function asset(path: string): string {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  return new URL(withLeadingSlash, site.origin).toString();
}
