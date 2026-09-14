export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.avfproduction.com';

  // Core static routes for your website
  const routes = [
    '',
    '/about',
    '/our-work',
    '/services',
    '/bts',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
