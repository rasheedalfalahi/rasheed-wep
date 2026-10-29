import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeoMetaForPath, SITE_URL } from '../lib/seo';

function setOrCreateMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function RouteSEOUpdater() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getSeoMetaForPath(pathname);
    const fullUrl =
      meta.canonicalPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${meta.canonicalPath}`;

    // Update document title
    document.title = meta.title;

    // Update standard meta tags
    setOrCreateMeta('name', 'title', meta.title);
    setOrCreateMeta('name', 'description', meta.description);

    // Update canonical link
    let canonicalEl = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullUrl);

    // Update OpenGraph tags
    setOrCreateMeta('property', 'og:type', meta.ogType);
    setOrCreateMeta('property', 'og:url', fullUrl);
    setOrCreateMeta('property', 'og:title', meta.title);
    setOrCreateMeta('property', 'og:description', meta.description);
    setOrCreateMeta('property', 'og:image', meta.imageUrl);
    setOrCreateMeta('property', 'og:image:width', meta.imageWidth);
    setOrCreateMeta('property', 'og:image:height', meta.imageHeight);
    setOrCreateMeta('property', 'og:image:alt', meta.imageAlt);

    // Update Twitter Card tags
    setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('name', 'twitter:url', fullUrl);
    setOrCreateMeta('name', 'twitter:title', meta.title);
    setOrCreateMeta('name', 'twitter:description', meta.description);
    setOrCreateMeta('name', 'twitter:image', meta.imageUrl);

    // Update JSON-LD structured data
    let jsonLdScript = document.head.querySelector(
      'script[type="application/ld+json"]'
    ) as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(meta.jsonLd, null, 2);
  }, [pathname]);

  return null;
}
