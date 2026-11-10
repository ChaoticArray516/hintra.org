import { expectedRoutes, jsonLd, result, textOf } from './helpers.mjs';

const faqCounts = {
  '/krillion-game/': 5,
  '/krillion-unlimited/': 5,
  '/one-in-a-krillion/': 4,
  '/noillirk/': 5,
  '/krillion-geography/': 4,
  '/es/krillion-unlimited/': 3,
  '/pt/krillion-unlimited/': 3,
};

export async function checkFaq(context) {
  const failures = [];
  for (const route of expectedRoutes) {
    const html = context.pages[route];
    if (!html) {
      failures.push(`${route}: missing page`);
      continue;
    }
    const visibleQuestions = [...html.matchAll(/<summary\b[^>]*data-faq-question[^>]*>([\s\S]*?)<\/summary>/gi)].map((match) => textOf(match[1]));
    const visibleAnswers = [...html.matchAll(/<p\b[^>]*data-faq-answer[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => textOf(match[1]));
    const expectedCount = faqCounts[route] ?? 0;
    if (visibleQuestions.length !== expectedCount || visibleAnswers.length !== expectedCount) {
      failures.push(`${route}: visible ${visibleQuestions.length}/${visibleAnswers.length}, expected ${expectedCount}`);
      continue;
    }
    if (expectedCount === 0) {
      if (/"FAQPage"/.test(html)) failures.push(`${route}: unexpected FAQPage`);
      continue;
    }
    const graph = jsonLd(html)[0]['@graph'];
    const faqPage = graph.find((node) => node['@type'] === 'FAQPage');
    const entities = faqPage?.mainEntity ?? [];
    if (entities.length !== expectedCount) {
      failures.push(`${route}: Schema ${entities.length}, expected ${expectedCount}`);
      continue;
    }
    entities.forEach((entity, index) => {
      if (entity.name !== visibleQuestions[index] || entity.acceptedAnswer?.text !== visibleAnswers[index]) {
        failures.push(`${route}: FAQ ${index + 1} differs`);
      }
    });
  }
  const expectedSequence = expectedRoutes.map((route) => faqCounts[route] ?? 0).join('/');
  return [result('S-06', failures.length === 0, failures.length ? failures.join(' | ') : `visible FAQ and Schema match verbatim in order: ${expectedSequence}`)];
}
