// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OVK Tech Specs',
  tagline: 'Technische Standards des Online-Vermarkterkreises',
  favicon: 'img/logo_ovk_mobile.png',

  url: 'https://tech.ovk.de',
  baseUrl: '/',
  trailingSlash: false,

  organizationName: 'BVDW-org',
  projectName: 'ovk-docusaurus',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownImages: 'throw',
      onBrokenMarkdownLinks: 'throw',
    },
  },

  clientModules: [require.resolve('./src/clientModules/identitySolutionsEnhancer.js')],

  i18n: {
    defaultLocale: 'de',
    locales: ['de'],
    localeConfigs: {
      de: {
        htmlLang: 'de-DE',
        label: 'Deutsch',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          exclude: ['tutorial-basics/**', 'tutorial-extras/**'],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        image: 'img/ovk-hero-technical-grid.png',
        metadata: [
          {
            name: 'keywords',
            content:
              'OVK, Tech Specs, Identity, Contextual Standard, Werbeformen, digitale Werbung',
          },
        ],
        colorMode: {
          defaultMode: 'light',
          disableSwitch: false,
          respectPrefersColorScheme: true,
        },
        navbar: {
          title: 'Tech Specs',
          logo: {
            alt: 'OVK Logo',
            src: 'img/logo_ovk_mobile.png',
          },
          items: [
           
            { to: '/docs/identitysolutions/', label: 'Identity', position: 'left' },
            { to: '/docs/contextualstandards/', label: 'OVK Contextual Standard', position: 'left' },
             { to: '/docs/werbeformen/', label: 'Werbeformen', position: 'left' },
            
           
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
         
          copyright: `Copyright © ${new Date().getFullYear()} Online-Vermarkterkreis (OVK).`,
        },
        prism: {
          theme: prismThemes.github,
          darkTheme: prismThemes.dracula,
        },
      }),
};


export default config;
