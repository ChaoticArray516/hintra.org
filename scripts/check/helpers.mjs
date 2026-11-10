import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const distRoot = path.resolve('dist');
export const origin = 'https://hintra.org';
export const expectedRoutes = [
  '/',
  '/krillion-game/',
  '/krillion-unlimited/',
  '/one-in-a-krillion/',
  '/noillirk/',
  '/krillion-geography/',
  '/es/krillion-unlimited/',
  '/pt/krillion-unlimited/',
];

export const expectedHomeEntryRoutes = [
  '/krillion-game/',
  '/krillion-unlimited/',
  '/noillirk/',
  '/krillion-geography/',
  '/one-in-a-krillion/',
];

export function result(id, pass, message) {
  return { id, pass: Boolean(pass), message };
}

export async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

export function routeFromFile(file) {
  const relative = path.relative(distRoot, file).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return null;
}

export function fileFromRoute(route) {
  return route === '/' ? 'index.html' : `${route.slice(1)}index.html`;
}

export function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)')`, 'i'));
  return match ? (match[1] ?? match[2] ?? '') : undefined;
}

export function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
}

export function decodeHtml(value) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    if (code[0] === '#') {
      const radix = code[1].toLowerCase() === 'x' ? 16 : 10;
      const number = Number.parseInt(code.slice(radix === 16 ? 2 : 1), radix);
      return Number.isFinite(number) ? String.fromCodePoint(number) : entity;
    }
    return named[code.toLowerCase()] ?? entity;
  });
}

export function textOf(value) {
  return decodeHtml(value.replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '')).trim();
}

export function copyText(html) {
  const fragments = [];
  const pattern = /<([a-z][a-z0-9]*)\b[^>]*\bdata-copy(?=\s|=|>)[^>]*>([\s\S]*?)<\/\1>/gi;
  for (const match of html.matchAll(pattern)) fragments.push(textOf(match[2]));
  return fragments.join(' ').replace(/\s+/g, ' ').trim();
}

export function jsonLd(html) {
  const scripts = html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) ?? [];
  return scripts
    .filter((script) => attr(tags(script, 'script')[0], 'type') === 'application/ld+json')
    .map((script) => JSON.parse(script.replace(/^<script\b[^>]*>/i, '').replace(/<\/script>$/i, '')));
}

export async function loadContext() {
  const files = await walk(distRoot);
  const htmlFiles = files.filter((file) => file.endsWith('.html'));
  const pages = {};
  for (const file of htmlFiles) {
    const route = routeFromFile(file);
    if (route) pages[route] = await readFile(file, 'utf8');
  }
  const read = async (relative) => readFile(path.join(distRoot, relative), 'utf8');
  return { files, htmlFiles, pages, read };
}
