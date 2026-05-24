/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      colors: {
        zinc: {
          950: '#09090b',
          925: '#0d0d10',
          900: '#18181b',
          875: '#1f1f23',
          850: '#232327',
        },
        accent: '#e34c26',
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.zinc.300'),
            '--tw-prose-headings': theme('colors.zinc.50'),
            '--tw-prose-links': theme('colors.zinc.50'),
            '--tw-prose-bold': theme('colors.zinc.50'),
            '--tw-prose-code': theme('colors.zinc.100'),
            '--tw-prose-quotes': theme('colors.zinc.300'),
            '--tw-prose-hr': theme('colors.zinc.800'),
            '--tw-prose-bullets': theme('colors.zinc.600'),
          },
        },
      }),
    },
  },
  plugins: [],
};
