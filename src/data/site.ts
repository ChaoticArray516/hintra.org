export const site = {
  origin: 'https://hintra.org',
  siteName: 'Hintra',
  footerDisclaimer: 'Independently operated. Not affiliated with Krillion.io.',
  defaultLocale: 'en',
} as const;

export const routes = {
  home: '/',
  unlimited: '/krillion-unlimited/',
  noillirk: '/noillirk/',
  geography: '/krillion-geography/',
  unlimitedEs: '/es/krillion-unlimited/',
  unlimitedPt: '/pt/krillion-unlimited/',
  oneInAKrillion: '/one-in-a-krillion/',
} as const;

export const keywordClusters = [
  {
    path: routes.oneInAKrillion,
    queries: [
      'one in a krillion movie',
      'krillion movie',
      'krillion meaning',
      'how much is a krillion',
      'what movie is one in a krillion from',
      'one in a krillion meaning',
      'is krillion a number',
      'what does one in a krillion mean',
    ],
  },
] as const;

export const primaryNavigation = [
  { label: 'Krillion Unlimited', path: routes.unlimited },
  { label: 'Noillirk', path: routes.noillirk },
  { label: 'Krillion Geography', path: routes.geography },
] as const;
