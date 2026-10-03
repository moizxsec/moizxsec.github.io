import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  site: 'https://moizxsec.github.io',
  integrations: [mdx(), sitemap(), tailwind({ applyBaseStyles: false })],
  markdown: {
    shikiConfig: {
      // Dual themes: Shiki emits --shiki-dark / --shiki-light variables and
      // global.css picks one per [data-theme]. defaultColor:false keeps the
      // inline styles out so the theme switch is pure CSS.
      themes: {
        dark: 'github-dark-dimmed',
        light: 'github-light',
      },
      defaultColor: false,
      wrap: false,
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['heading-anchor'], ariaLabel: 'Permalink' },
          content: { type: 'text', value: '#' },
        },
      ],
    ],
  },
});
