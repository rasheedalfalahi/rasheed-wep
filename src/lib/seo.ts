import { blogPosts } from '../data/blog';
import { projects } from '../data/projects';

export const SITE_URL = 'https://rasheedalfalahi.netlify.app';
export const SITE_NAME = 'رشيد الفلاحي | معرض الأعمال والمدونة';
export const DEFAULT_TITLE = 'رشيد الفلاحي | مصمم جرافيك & مهندس بصري - Rasheed Al-Falahi';
export const DEFAULT_DESCRIPTION =
  'الموقع الرسمي ومعرض الأعمال لمصمم الجرافيك والمهندس البصري رشيد حسين الفلاحي. أقدّم حلولاً بصرية تجمع بين الإبداع والبساطة لبناء علامات تجارية مميزة.';
export const DEFAULT_IMAGE = `${SITE_URL}/images/projects/mu.jpg`;

export interface PageSeoMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  ogType: 'website' | 'article';
  imageUrl: string;
  imageWidth: string;
  imageHeight: string;
  imageAlt: string;
  jsonLd: Record<string, unknown>;
}

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return DEFAULT_IMAGE;
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const normalized = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${normalized}`;
}

export function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function getSeoMetaForPath(rawPathname: string): PageSeoMetadata {
  const pathname = (rawPathname || '/').replace(/\/+$/, '') || '/';

  // 1. Check Blog Post: /blog/:id
  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const postId = decodeURIComponent(blogMatch[1]);
    const post = blogPosts.find((p) => p.id === postId || (p as any).slug === postId);
    if (post) {
      const fullTitle = `${post.title} | مدونة رشيد الفلاحي`;
      const imageUrl = toAbsoluteUrl(post.coverImage);
      const canonicalPath = `/blog/${post.id}`;
      return {
        title: fullTitle,
        description: post.excerpt,
        canonicalPath,
        ogType: 'article',
        imageUrl,
        imageWidth: '1200',
        imageHeight: '630',
        imageAlt: post.title,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: [imageUrl],
          author: {
            '@type': 'Person',
            name: 'رشيد حسين الفلاحي',
            url: SITE_URL,
          },
          publisher: {
            '@type': 'Person',
            name: 'رشيد حسين الفلاحي',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}${canonicalPath}`,
          },
        },
      };
    }
  }

  // 2. Check Project Detail: /project/:id or /projects/:id
  const projectMatch = pathname.match(/^\/projects?\/([^/]+)$/);
  if (projectMatch) {
    const projectId = decodeURIComponent(projectMatch[1]);
    const project = projects.find((p) => p.id === projectId || p.slug === projectId);
    if (project) {
      const fullTitle = `${project.title} | رشيد الفلاحي`;
      const imageUrl = toAbsoluteUrl(project.image);
      const canonicalPath = `/project/${project.id}`;
      return {
        title: fullTitle,
        description: project.description,
        canonicalPath,
        ogType: 'article',
        imageUrl,
        imageWidth: '1200',
        imageHeight: '630',
        imageAlt: project.title,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          image: imageUrl,
          creator: {
            '@type': 'Person',
            name: 'رشيد حسين الفلاحي',
            url: SITE_URL,
          },
          url: `${SITE_URL}${canonicalPath}`,
        },
      };
    }
  }

  // 3. Main Section Pages
  if (pathname === '/blog') {
    return {
      title: 'مدونة التصميم والهوية البصرية | رشيد الفلاحي',
      description:
        'مساحة معرفية نشارك فيها خلاصة التجارب في بناء الهويات البصرية، فلسفة التصميم الجرافيكي، وأسرار صناعة المحتوى البصري المؤثر.',
      canonicalPath: '/blog',
      ogType: 'website',
      imageUrl: DEFAULT_IMAGE,
      imageWidth: '1200',
      imageHeight: '630',
      imageAlt: 'مدونة رشيد الفلاحي للتصميم والهوية البصرية',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'مدونة التصميم والهوية البصرية | رشيد الفلاحي',
        description:
          'مقالات متخصصة في الهوية البصرية، الهندسة البصرية، ومنهجيات التصميم الجرافيكي.',
        url: `${SITE_URL}/blog`,
      },
    };
  }

  if (pathname === '/projects') {
    return {
      title: 'معرض المشاريع والأعمال البصرية | رشيد الفلاحي',
      description:
        'مجموعة مختارة من الأعمال الإبداعية في تصميم الشعارات، الهويات البصرية، الكاروسيل، والمطبوعات للمصمم رشيد الفلاحي.',
      canonicalPath: '/projects',
      ogType: 'website',
      imageUrl: DEFAULT_IMAGE,
      imageWidth: '1200',
      imageHeight: '630',
      imageAlt: 'معرض أعمال رشيد الفلاحي',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'معرض المشاريع والأعمال البصرية | رشيد الفلاحي',
        url: `${SITE_URL}/projects`,
      },
    };
  }

  if (pathname === '/services') {
    return {
      title: 'الخدمات الإبداعية وتصميم الهويات | رشيد الفلاحي',
      description:
        'خدمات احترافية في تصميم الهوية البصرية، واجهات المستخدم، المحتوى الرقمي، المطبوعات، والإنفوجرافيك.',
      canonicalPath: '/services',
      ogType: 'website',
      imageUrl: DEFAULT_IMAGE,
      imageWidth: '1200',
      imageHeight: '630',
      imageAlt: 'الخدمات الإبداعية - رشيد الفلاحي',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'الخدمات الإبداعية | رشيد الفلاحي',
        url: `${SITE_URL}/services`,
      },
    };
  }

  if (pathname === '/testimonials') {
    return {
      title: 'آراء العملاء وشركاء النجاح | رشيد الفلاحي',
      description:
        'شهادات وتجارب موثقة من عملاء وشركاء نجاح جمعتنا بهم مشاريع تصميمية متكاملة في الهوية البصرية والتصميم.',
      canonicalPath: '/testimonials',
      ogType: 'website',
      imageUrl: DEFAULT_IMAGE,
      imageWidth: '1200',
      imageHeight: '630',
      imageAlt: 'آراء العملاء - رشيد الفلاحي',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'آراء العملاء | رشيد الفلاحي',
        url: `${SITE_URL}/testimonials`,
      },
    };
  }

  if (pathname === '/contact') {
    return {
      title: 'تواصل معنا لبدء مشروعك القادم | رشيد الفلاحي',
      description:
        'تواصل مباشرة مع المصمم والمهندس البصري رشيد الفلاحي لمناقشة فكرتك وبناء هوية بصرية احترافية لمشروعك.',
      canonicalPath: '/contact',
      ogType: 'website',
      imageUrl: DEFAULT_IMAGE,
      imageWidth: '1200',
      imageHeight: '630',
      imageAlt: 'تواصل مع رشيد الفلاحي',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'تواصل مع رشيد الفلاحي',
        url: `${SITE_URL}/contact`,
      },
    };
  }

  // 4. Default Home Metadata
  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    canonicalPath: '/',
    ogType: 'website',
    imageUrl: DEFAULT_IMAGE,
    imageWidth: '1200',
    imageHeight: '630',
    imageAlt: 'رشيد الفلاحي | مصمم جرافيك ومهندس بصري',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'رشيد حسين الفلاحي',
      alternateName: ['رشيد الفلاحي', 'Rasheed Al-Falahi'],
      jobTitle: 'مصمم جرافيك ومهندس بصري',
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/images/projects/icon.png`,
      description:
        'مصمم جرافيك ومهندس بصري متخصص في بناء الهويات البصرية والخط العربي وتصميم الشعارات.',
    },
  };
}

/**
 * Replaces the SEO/OpenGraph/Twitter tags inside an index.html template string
 * with the tailored metadata for a specific route.
 */
export function injectSeoIntoHtml(htmlTemplate: string, pathname: string): string {
  const meta = getSeoMetaForPath(pathname);
  const fullUrl =
    meta.canonicalPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${meta.canonicalPath}`;

  const safeTitle = escapeHtmlAttr(meta.title);
  const safeDesc = escapeHtmlAttr(meta.description);
  const safeImage = escapeHtmlAttr(meta.imageUrl);
  const safeAlt = escapeHtmlAttr(meta.imageAlt);
  const safeUrl = escapeHtmlAttr(fullUrl);

  let html = htmlTemplate;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);

  // Replace primary meta tags
  html = html.replace(
    /<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${safeUrl}" />`
  );

  // Replace OpenGraph tags
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${meta.ogType}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${safeUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${safeImage}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:width"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:width" content="${meta.imageWidth}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:height"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:height" content="${meta.imageHeight}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:alt" content="${safeAlt}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:url" content="${safeUrl}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${safeImage}" />`
  );

  // Replace JSON-LD script
  html = html.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">\n${JSON.stringify(meta.jsonLd, null, 2)}\n    </script>`
  );

  return html;
}

/**
 * Returns all routes that should be generated as standalone static HTML files
 * (`dist/<route>/index.html`) during build time so social media crawlers
 * (WhatsApp, Telegram, Facebook, X/Twitter, LinkedIn) receive tailored <head> tags.
 */
export function getAllStaticSeoRoutes(): string[] {
  const routes = new Set<string>([
    '/blog',
    '/projects',
    '/services',
    '/testimonials',
    '/contact',
  ]);

  for (const post of blogPosts) {
    routes.add(`/blog/${post.id}`);
    if (post.slug) {
      routes.add(`/blog/${post.slug}`);
    }
  }

  for (const project of projects) {
    routes.add(`/project/${project.id}`);
    routes.add(`/projects/${project.id}`);
    if (project.slug) {
      routes.add(`/project/${project.slug}`);
      routes.add(`/projects/${project.slug}`);
    }
  }

  return Array.from(routes);
}

/**
 * Dynamically generates sitemap.xml from all current pages, blogPosts, and projects.
 */
export function generateSitemapXml(lastmod = '2026-10-29'): string {
  const mainPages = [
    { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0' },
    { loc: `${SITE_URL}/projects`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${SITE_URL}/blog`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${SITE_URL}/services`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_URL}/testimonials`, changefreq: 'monthly', priority: '0.7' },
    { loc: `${SITE_URL}/contact`, changefreq: 'monthly', priority: '0.8' },
  ];

  const blogEntries = blogPosts.map((post) => ({
    comment: `مقال ${post.id}: ${post.title}`,
    loc: `${SITE_URL}/blog/${post.slug || post.id}`,
    changefreq: 'monthly',
    priority: '0.8',
  }));

  const projectEntries = projects.map((project) => ({
    comment: `مشروع ${project.id}: ${project.title}`,
    loc: `${SITE_URL}/project/${project.slug || project.id}`,
    changefreq: 'monthly',
    priority: '0.7',
  }));

  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '',
    '  <!-- ========================================== -->',
    '  <!-- 1. الصفحة الرئيسية والأقسام                -->',
    '  <!-- ========================================== -->',
  ];

  for (const page of mainPages) {
    lines.push(
      '  <url>',
      `    <loc>${page.loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${page.changefreq}</changefreq>`,
      `    <priority>${page.priority}</priority>`,
      '  </url>',
      ''
    );
  }

  lines.push(
    '  <!-- ========================================== -->',
    '  <!-- 2. روابط مقالات المدونة (تلقائي)          -->',
    '  <!-- ========================================== -->'
  );

  for (const entry of blogEntries) {
    lines.push(
      `  <!-- ${entry.comment} -->`,
      '  <url>',
      `    <loc>${entry.loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority}</priority>`,
      '  </url>',
      ''
    );
  }

  lines.push(
    '  <!-- ========================================== -->',
    '  <!-- 3. روابط صفحات المشاريع والأعمال (تلقائي)  -->',
    '  <!-- ========================================== -->'
  );

  for (const entry of projectEntries) {
    lines.push(
      `  <!-- ${entry.comment} -->`,
      '  <url>',
      `    <loc>${entry.loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority}</priority>`,
      '  </url>',
      ''
    );
  }

  lines.push('</urlset>', '');
  return lines.join('\n');
}

