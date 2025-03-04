import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'My Site',
  tagline: '记录学习与工作～',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: ['@docusaurus/theme-live-codeblock'],

  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Lake_tj',
      logo: { alt: 'Lake_tj', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'knowledgeSidebar', position: 'left', label: '知识库' },
        { type: 'docSidebar', sidebarId: 'formsSidebar', position: 'left', label: '表单' },
        { to: '/blog', label: '博客', position: 'left' },
        { to: '/td', label: '梯度', position: 'left' },
        { href: 'https://github.com', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '梯度科技',
          items: [
            { label: '业财', href: 'http://91.tiduyun.com:38081/wui/index.html' },
            { label: 'Git', href: 'https://git.tiduyun.com' },
            { label: 'Jira', href: 'https://jira.tiduyun.com/secure/Dashboard.jspa' },
            { label: '文档中心', href: 'https://doc.tiduyun.com' },
            { label: 'TDUI-EXT', href: 'http://10.10.4.253' },
          ],
        },
        {
          title: '更多资源',
          items: [
            { label: 'VUE', href: 'https://cn.vuejs.org' },
            { label: 'React', href: 'https://zh-hans.react.dev' },
            { label: 'Angular', href: 'https://angular.cn' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Lake_tj. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    liveCodeBlock: {
      /**
       * 实时效果显示的位置，在编辑器上方还是下方
       * 可选参数："top" | "bottom"
       */
      playgroundPosition: 'bottom',
    },
  } satisfies Preset.ThemeConfig,
}

export default config
