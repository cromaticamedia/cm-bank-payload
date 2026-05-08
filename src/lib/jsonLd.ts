export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cromatica Media',
    url: 'https://cromatica.com',
    logo: 'https://cromatica.com/logo-light-cropped.png',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['English', 'Spanish'],
    },
  }
}

export function getWebsiteJsonLd(locale: string) {
  const isEn = locale === 'en'
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cromatica Block Bank',
    url: `https://cromatica.com/${locale}`,
    description: isEn
      ? 'Reusable blocks and templates repository for the Cromatica team and clients.'
      : 'Repositorio de bloques y templates reutilizables para el equipo y clientes de Cromatica.',
    inLanguage: isEn ? 'en-US' : 'es-PE',
    publisher: {
      '@type': 'Organization',
      name: 'Cromatica Media',
    },
  }
}
