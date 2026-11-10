import { homePage } from './pages/home';

export function relatedEntries(currentPath: string) {
  return homePage.entries.filter((entry) => entry.path !== currentPath);
}
