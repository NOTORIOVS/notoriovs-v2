/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // La página de descalificados v1.1 sustituye a /not-elegible (recomendación a 3Cuartos AG).
      {source: '/not-elegible', destination: '/mapa-de-numeros', permanent: false},
    ];
  },
};

module.exports = nextConfig
