/** @type {import('tailwindcss').Config} */

// Every colour is a CSS variable (RGB triplet) declared in global.css so the same
// utility classes render correctly in both the dark (default) and light themes.
const token = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        bg: token('--c-bg'),
        elev: token('--c-elev'),
        sub: token('--c-sub'),
        line: token('--c-line'),
        'line-strong': token('--c-line-strong'),
        fg: token('--c-fg'),
        muted: token('--c-muted'),
        faint: token('--c-faint'),
        accent: token('--c-accent'),
        'accent-fg': token('--c-accent-fg'),
      },
      maxWidth: {
        site: '72rem',
        prose: '44rem',
      },
      letterSpacing: {
        label: '0.14em',
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        card: '0 1px 0 0 rgb(var(--c-line) / 1), 0 0 0 1px rgb(var(--c-line) / 1)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
