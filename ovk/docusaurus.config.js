// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Tech Specs',
  tagline: '',
  favicon: 'img/logo_ovk_mobile.png',

  // Set the production url of your site here
  url: 'https://tech.ovk.de', // Changed from url tech.ovk.de to test
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false, // oder true je nach Wunsch


  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'OVK', // Usually your GitHub org/user name.
  projectName: 'tech-specs', // Usually your repo name.

  onBrokenLinks: 'warn',// changed from throw to warm to skip
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'de',
    locales: ['de','en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
         // editUrl:
           //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
         // editUrl:
           //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
          title: 'Tech Specs',
          logo: {
            alt: 'OVK Logo',
            src: 'img/logo_ovk_mobile.png',
          },
          items: [
           
            { to: '/docs/identitysolutions/', label: 'Identity', position: 'left' },
            { to: '/docs/contextualstandards/', label: 'OVK Contextual Standard', position: 'left' },
            
           
          ],
        },
        footer: {
          style: 'light',
          links: [{
            title: 'Menü',
            items: [
              {
                label: 'Der OVK',
                href: 'https://www.ovk.de/der-ovk/',
              },
              {
                label: 'Projekte',
                href: 'https://www.ovk.de/projekte/',
              },
              {
                label: 'News',
                href: 'https://www.ovk.de/news/',
              },
              {
                label: 'Kontakt',
                href: 'https://www.ovk.de/kontakt/',
              },
            ],
          },
            
            {
              title: 'Folgen Sie uns',
              items: [
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/company/german-federal-association-of-the-digital-economy-bvdw-e.v.-/',
                },
                {
                  label: 'Xing',
                  href: 'https://www.xing.com/companies/bundesverbanddigitalewirtschaft',
                },
                {
                  label: 'Facebook',
                  href: 'https://www.facebook.com/BVDW.eV',
                },
              ],
            },
            {
              title: 'Weiteres',
              items: [
                {
                  label: 'Impressum',
                  href: 'https://www.ovk.de/impressum/',
                },
                {
                  label: 'Datenschutz',
                  href: 'https://www.ovk.de/datenschutz/',
                },
                {
                  label: 'Downloads',
                  href: 'https://www.ovk.de/downloads/',
                },
              ],
            },
          ],
         
          copyright: `Copyright © ${new Date().getFullYear()} OVK, Built with Docusaurus.`,
        },
        prism: {
          theme: prismThemes.github,
          darkTheme: prismThemes.dracula,
        },
      }),
};


export default config;