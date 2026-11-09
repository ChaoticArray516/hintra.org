import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { distRoot, result } from './helpers.mjs';

export async function checkBudget(context) {
  const sizes = await Promise.all(context.files.map(async (file) => ({ file, size: (await stat(file)).size })));
  const jsFiles = context.files.filter((file) => file.endsWith('.js'));
  let jsGzip = 0;
  for (const file of jsFiles) jsGzip += gzipSync(await readFile(file)).length;
  const cssFiles = context.files.filter((file) => file.endsWith('.css'));
  let cssGzip = 0;
  for (const file of cssFiles) cssGzip += gzipSync(await readFile(file)).length;
  const largest = sizes.reduce((max, item) => item.size > max.size ? item : max, { size: 0, file: '' });
  const budgetPass = context.files.length < 20000 && largest.size < 25 * 1024 * 1024 && jsFiles.length === 0;
  const budgetResult = result('R-10', budgetPass, `files=${context.files.length}; largest=${largest.size} bytes; JS=${jsFiles.length}/${jsGzip} gzip bytes; CSS=${cssFiles.length}/${cssGzip} gzip bytes`);

  const assetFailures = [];
  for (const file of ['favicon.svg', 'brand-lockup.svg', 'logo-monochrome.svg', 'logo-192.png', 'logo-512.png', 'og.png']) {
    if (!context.files.includes(path.join(distRoot, file))) assetFailures.push(`missing ${file}`);
  }
  for (const [file, width, height] of [['og.png', 1200, 630], ['logo-192.png', 192, 192], ['logo-512.png', 512, 512]]) {
    try {
      const png = await readFile(path.join(distRoot, file));
      if (png.readUInt32BE(16) !== width || png.readUInt32BE(20) !== height) assetFailures.push(`${file} dimensions`);
    } catch {
      assetFailures.push(`unreadable ${file}`);
    }
  }
  const forbiddenAssets = context.files.filter((file) => /palette-2|icon-preview|\.zip$|favicon\.ico$|apple-touch-icon/.test(file));
  if (forbiddenAssets.length) assetFailures.push('forbidden or undeclared assets present');
  const assetResult = result('ASSETS', assetFailures.length === 0, assetFailures.length ? assetFailures.join(', ') : 'A palette assets present; PNG dimensions valid; no previews, palette-2, zip, ico, or apple-touch-icon');
  return [budgetResult, assetResult];
}
