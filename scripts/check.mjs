import { loadContext } from './check/helpers.mjs';
import { checkRender } from './check/render.mjs';
import { checkSeo } from './check/seo.mjs';
import { checkFaq } from './check/faq-diff.mjs';
import { checkBudget } from './check/budget.mjs';

try {
  const context = await loadContext();
  const results = [
    ...await checkRender(context),
    ...await checkSeo(context),
    ...await checkFaq(context),
    ...await checkBudget(context),
  ];
  for (const item of results) {
    console.log(`${item.pass ? 'PASS' : 'FAIL'} ${item.id} ${item.message}`);
  }
  const failures = results.filter((item) => !item.pass);
  console.log(`\n${results.length - failures.length} passed; ${failures.length} failed.`);
  if (failures.length) process.exit(1);
} catch (error) {
  console.error(`FAIL CHECK ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
